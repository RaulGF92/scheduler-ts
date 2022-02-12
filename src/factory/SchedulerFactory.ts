
import { annotationsType, Schedule, ScheduledConfig, ScheduledCronConfig, ScheduleIntervalConfig } from "../types";
import ScheduleStaticCron from "./static/ScheduleStaticCron";
import ScheduleStaticInterval from "./static/ScheduleStaticInterval";
import ScheduleStaticVoid from "./static/ScheduleStaticVoid";
import EventEmiter from 'events';

class SchedulerEmitter extends EventEmiter {
  constructor() {
    super();
  }
}

const emitter = new SchedulerEmitter();
export default class SchedulerFactory {
  static getVariableSchedule(_type: annotationsType) {
    console.log(emitter);
  }

  static getStaticSchedule(
    type: annotationsType, 
    functionMetadata: Schedule["functionMetadata"],
    config: ScheduledConfig
  ): Schedule {
    switch(type) {
      case annotationsType.CRON:
        return new ScheduleStaticCron(functionMetadata, <ScheduledCronConfig> config);
      case annotationsType.INTERVAL:
        return new ScheduleStaticInterval(functionMetadata, <ScheduleIntervalConfig> config);
      case annotationsType.VOID:
        return new ScheduleStaticVoid(functionMetadata, <ScheduledCronConfig> config);
      default:
        throw new Error("Factory error type scheduled not implemented");
    }
  }
}
