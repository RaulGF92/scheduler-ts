import { Void } from "../src/annotations";
import {default as sinon} from 'ts-sinon';
import SchedulerFactory from "../src/factory/SchedulerFactory";
import { ScheduledExecution } from "../src";

const sandbox = sinon.createSandbox();

beforeEach(function () {
    sandbox.spy(SchedulerFactory, "getStaticSchedule");
});

afterEach(function () {
    sandbox.restore();
});

/**
 * annotations method must be static method unless a father instance keep instances of each class
 */

test('annotations only will be invoke one time when is imported', () => {
    class TestClass {

        @Void("5 4 * * *")
        static entrypoint(execution: ScheduledExecution) {
            console.log("Entra", execution);
        }
    }

    expect(TestClass).not.toBeNull();
    const instance = null;
    expect(instance).toBeNull();
});

test('annotations does not affect the number of creations', () => {
    class TestClass {

        @Void("5 4 * * *")
        static entrypoint(execution: ScheduledExecution) {
            console.log("Entra", execution);
        }
    }

    expect(TestClass).not.toBeNull();
    const instance = new TestClass();
    const instance2 = new TestClass();
    expect(instance).not.toBeNull();
    expect(instance2).not.toBeNull();
});

test('if annotations is a type string and does not has a cron style will throw error', () => {
    expect(() => {
        Void("Hello");
      }).toThrow();
      
    expect(() => {
        Void("5 4 * * *");
    }).not.toThrow();
});

test('if annotation is bind to static method annotation will invoke to getStaticSchedule', () => {
 
    class TestStatic {

        constructor() {}

        public getHello() {
            return "Hello"
        }

        @Void("5 4 * * *")
        public static entrypoint(execution: ScheduledExecution) {
            expect(execution.cron).not.toBeNull();
            expect(execution.name).not.toBeNull();
            expect(execution.startDate).not.toBeNull()
        }
    }
    expect(TestStatic).not.toBeNull();
    expect((<any> SchedulerFactory.getStaticSchedule).calledOnce).toBeTruthy() 
});

test('if annotation is bind to non static method annotation will invoke to getStaticSchedule', () => {
 
    class TestNoNStatic {

        public static getHello() {
            return "Hello"
        }

        @Void("5 4 * * *")
        entrypoint(execution: ScheduledExecution) {
            expect(execution.cron).not.toBeNull();
            expect(execution.name).not.toBeNull();
            expect(execution.startDate).not.toBeNull()
        }
    }
    expect(TestNoNStatic).not.toBeNull();
    expect((<any> SchedulerFactory.getStaticSchedule).calledOnce).not.toBeTruthy() 
});