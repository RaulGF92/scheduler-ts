import { annotationsType, Schedule, ScheduledConfig } from "..";
import ScheduleStaticCron from "./static/ScheduleStaticCron";
import ScheduleStaticVoid from "./static/ScheduleStaticVoid";

export default class SchedulerFactory {
  static getStaticSchedule(
    type: annotationsType, 
    functionMetadata: Schedule["functionMetadata"],
    config: ScheduledConfig
  ): Schedule {
    switch(type) {
      case annotationsType.CRON:
        return new ScheduleStaticCron(functionMetadata, config);
      case annotationsType.VOID:
        return new ScheduleStaticVoid(functionMetadata, config);
      default:
        throw new Error("Factory error type scheduled not implemented");
    }
      
  }
}
