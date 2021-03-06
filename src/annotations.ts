/* eslint-disable @typescript-eslint/no-explicit-any */
import { annotationsType, ScheduledConfig, ScheduledExecution, ScheduleIntervalConfig } from './types';
import Utils from './Utils';
import { v4 as uuidv4 } from 'uuid';
import SchedulerFactory from './factory/SchedulerFactory';
import Scheduler from './Scheduler';
import { ScheduledCronConfig } from '.';
import ScheduleInitialized from './factory/variable/ScheduleInitialized';

export const SCHEDULES_METADATA_KEY = '__schedulers__';
export const DECORATORS_METADATA_KEY = '__decorators__';

const loadAndCheckDefaultOptions = <T extends ScheduledConfig>(config: T): T => {
    const targetName = uuidv4().toString();
    config.name = config.name || targetName;
    return config;
};

const handleStaticFunction = function (
    type: annotationsType,
    functionMetadata: {
        target: any;
        propertyKey: string;
        descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
    },
    config: ScheduledConfig,
) {
    const schedule = SchedulerFactory.getStaticSchedule(type, functionMetadata, config);
    Scheduler.add(schedule);
    Scheduler.start(<string>schedule.config.name);
};

const handleNonStaticFunction = (
    type: annotationsType,
    functionMetadata: {
        target: any;
        propertyKey: string;
        descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
    },
    config: ScheduledConfig,
) => {
    const decorators: Record<string, string[]> = Reflect.get(functionMetadata.target, DECORATORS_METADATA_KEY) || {};
    const schedules: Record<string, Record<string, unknown>> = Reflect.get(
        functionMetadata.target,
        SCHEDULES_METADATA_KEY,
    ) || {};

    if (!decorators[functionMetadata.propertyKey]) {
        decorators[functionMetadata.propertyKey] = [];
    }

    if (!schedules[functionMetadata.propertyKey]) {
        schedules[functionMetadata.propertyKey] = { name: functionMetadata.propertyKey };
    }

    decorators[functionMetadata.propertyKey].push(type.toString());
    schedules[functionMetadata.propertyKey][type.toString()] = { name: type.toString(), config };

    Reflect.set(functionMetadata.target, SCHEDULES_METADATA_KEY, schedules);
    Reflect.set(functionMetadata.target, DECORATORS_METADATA_KEY, decorators);

    const schedule = SchedulerFactory.getVariableSchedule(type, functionMetadata, config);
    Scheduler.add(schedule);
    Scheduler.start(<string>schedule.config.name);
};

const createNewScheduleAnnotation = function (
    type: annotationsType,
    configValid: ScheduledConfig,
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>,
) {
    const functionMetadata = { target, propertyKey, descriptor };

    /*
        When method is static, annotation layer pass a constructor but
        if the method is not static, annotation layer pass a instance with
        all variables to undefined.
        */
    const isNonAInstanceClass =
        typeof target === 'function' && !Object.getOwnPropertyNames(target).includes('constructor');

    if (isNonAInstanceClass) {
        handleStaticFunction(type, functionMetadata, configValid);
    } else {
        handleNonStaticFunction(type, functionMetadata, configValid);
    }
};

// Annotations

export function SchedulerInstance() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function _DecoratorName<T extends { new (...args: any[]): {} }>(constr: T) {
        return class extends constr {
            constructor(...args: any[]) {
                super(...args);
                const schedules = Reflect.get(this, SCHEDULES_METADATA_KEY);

                const jobToStart: { propertyKey: string; annotation: string; scheduleName: string }[] = [];
                Object.values(schedules).forEach((method: any) => {
                    Object.values(method)
                        .filter((item) => typeof item == 'object')
                        .forEach((annotation: any) => {
                            jobToStart.push({
                                propertyKey: method.name,
                                annotation: annotation.name,
                                scheduleName: annotation.config.name,
                            });
                        });
                });

                jobToStart.forEach((job) => {
                    const adn = ScheduleInitialized.buildADN(
                        job.annotation as annotationsType,
                        job.propertyKey,
                        job.scheduleName,
                    );
                    SchedulerFactory.emitter.on(adn, (executionInfo) => {
                        (<any>this)[job.propertyKey](executionInfo);
                    });
                });
            }
        };
    };
}

export function Cron(config: string | ScheduledCronConfig) {
    const type = annotationsType.CRON;
    let configOutput = typeof config === 'string' ? <ScheduledCronConfig>{ cron: config } : config;

    configOutput = loadAndCheckDefaultOptions(configOutput);

    if (!Utils.isCron(configOutput.cron)) throw Error(`${configOutput.cron} Doesn't follow cron statements`);

    return function (
        target: any,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>,
    ) {
        createNewScheduleAnnotation(type, configOutput, target, propertyKey, descriptor);
    };
}

export function Interval(config: number | ScheduleIntervalConfig) {
    const type = annotationsType.INTERVAL;
    let configOutput = typeof config === 'number' ? <ScheduleIntervalConfig>{ interval: config } : config;

    configOutput = loadAndCheckDefaultOptions(configOutput);
    configOutput.interval = Number(configOutput.interval);

    return function (
        target: any,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>,
    ) {
        createNewScheduleAnnotation(type, configOutput, target, propertyKey, descriptor);
    };
}

export function Void(config: string | ScheduledCronConfig) {
    const type = annotationsType.VOID;
    let configOutput = typeof config === 'string' ? <ScheduledCronConfig>{ cron: config } : config;

    configOutput = loadAndCheckDefaultOptions(configOutput);

    if (!Utils.isCron(configOutput.cron)) throw Error(`${configOutput.cron} Doesn't follow cron statements`);

    return function (
        target: any,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>,
    ) {
        return createNewScheduleAnnotation(type, configOutput, target, propertyKey, descriptor);
    };
}
