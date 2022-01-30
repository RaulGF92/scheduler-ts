import { ScheduledConfig, ScheduledExecution } from "../..";
import { Schedule } from "../../";
import { annotationsType, scheduleState, invokationType } from "../../types";

export default abstract class ScheduleStatic implements Schedule {
  state: scheduleState = scheduleState.STOP;
  readonly invokationType: invokationType = invokationType.STATIC;

  constructor(
    readonly type: annotationsType,
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
      type: this.type,
      invokationType: this.invokationType
    };
  }

  async executeFunction(): Promise<void> {
    const { target, propertyKey } = this.functionMetadata;
    this.state = scheduleState.RUNNING;
    try {
      await target[propertyKey](this.buildScheduledExecution());
    } catch (error) {
      console.trace(error);
    } finally {
      this.state = scheduleState.START;
    }
  }

  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
}
