import { ScheduledConfig, ScheduledExecution } from "..";
import { Schedule } from "../";

export default class ScheduleStatic implements Schedule {
  constructor(
    readonly functionMetadata: {
      target: any;
      propertyKey: string;
      descriptor: TypedPropertyDescriptor<
        (execution: ScheduledExecution) => void
      >;
    },
    readonly config: ScheduledConfig
  ) {}

  buildScheduledExecution(): ScheduledExecution {
    return <ScheduledExecution>{
      startDate: new Date(),
      cron: this.config.cron,
      name: this.config.name,
    };
  }

  async executeFunction(): Promise<void> {
    const { target, propertyKey } = this.functionMetadata;
    try {
      await target[propertyKey](this.buildScheduledExecution());
    } catch (error) {
      console.trace(error);
    }
  }
}
