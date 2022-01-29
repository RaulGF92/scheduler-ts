import { Schedule, ScheduledConfig } from "..";
import ScheduleStatic from "./ScheduleStatic";

export default class SchedulerFactory {
  static getStaticSchedule(
    functionMetadata: Schedule["functionMetadata"],
    config: ScheduledConfig
  ): Schedule {
    return new ScheduleStatic(functionMetadata, config);
  }
}
