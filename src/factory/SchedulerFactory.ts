import { annotationsType, Schedule, ScheduledConfig, ScheduledCronConfig, ScheduleIntervalConfig } from '../types';
import ScheduleStaticCron from './static/ScheduleStaticCron';
import ScheduleStaticInterval from './static/ScheduleStaticInterval';
import ScheduleStaticVoid from './static/ScheduleStaticVoid';
import EventEmiter from 'events';
import ScheduleInitializedCron from './variable/ScheduleInitializedCron';
import ScheduleInitializedVoid from './variable/ScheduleInitializedVoid';
import ScheduleInitializedInterval from './variable/ScheduleInitializedInterval';

class SchedulerEmitter extends EventEmiter {
    constructor() {
        super();
    }
}

export default class SchedulerFactory {
    static readonly emitter = new SchedulerEmitter();

    static getVariableSchedule(
        type: annotationsType,
        functionMetadata: Schedule['functionMetadata'],
        config: ScheduledConfig,
    ) {
        switch (type) {
            case annotationsType.CRON:
                return new ScheduleInitializedCron(functionMetadata, <ScheduledCronConfig>config);
            case annotationsType.VOID:
                return new ScheduleInitializedVoid(functionMetadata, <ScheduledCronConfig>config);
            case annotationsType.INTERVAL:
                return new ScheduleInitializedInterval(functionMetadata, <ScheduleIntervalConfig>config);
            default:
                throw new Error('Factory error type scheduled not implemented yet');
        }
    }

    static getStaticSchedule(
        type: annotationsType,
        functionMetadata: Schedule['functionMetadata'],
        config: ScheduledConfig,
    ): Schedule {
        switch (type) {
            case annotationsType.CRON:
                return new ScheduleStaticCron(functionMetadata, <ScheduledCronConfig>config);
            case annotationsType.INTERVAL:
                return new ScheduleStaticInterval(functionMetadata, <ScheduleIntervalConfig>config);
            case annotationsType.VOID:
                return new ScheduleStaticVoid(functionMetadata, <ScheduledCronConfig>config);
            default:
                throw new Error('Factory error type scheduled not implemented yet');
        }
    }
}
