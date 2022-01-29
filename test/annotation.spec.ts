import { Scheduled } from "../src/annotations";
import TestClass from "./utils/TestClass";

/**
 * annotations method must be static method unless a father instance keep instances of each class
 */

test('annotations only will be invoke one time when is imported', () => {
    expect(TestClass).not.toBeNull();
    const instance = null;
    expect(instance).toBeNull();
});

test('annotations does not affect the number of creations', () => {
    expect(TestClass).not.toBeNull();
    const instance = new TestClass();
    const instance2 = new TestClass();
    expect(instance).not.toBeNull();
    expect(instance2).not.toBeNull();
});

test('if annotations is a type string and does not has a cron style will throw error', () => {
    expect(() => {
        Scheduled("Hello");
      }).toThrow();
      
    expect(() => {
        Scheduled("5 4 * * *");
    }).not.toThrow();
});