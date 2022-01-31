import { annotationsType, Schedule, ScheduledConfig, ScheduledCronConfig, ScheduleIntervalConfig } from "..";
import ScheduleStaticCron from "./static/ScheduleStaticCron";
import ScheduleStaticInterval from "./static/ScheduleStaticInterval";
import ScheduleStaticVoid from "./static/ScheduleStaticVoid";

export default class SchedulerFactory {
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
