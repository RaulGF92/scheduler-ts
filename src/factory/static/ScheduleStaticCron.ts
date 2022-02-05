import ScheduleStatic from "./ScheduleStatic";
import * as cron from 'node-cron';
import { annotationsType, ScheduledCronConfig, ScheduledExecution } from "../../types";

export default class ScheduleStaticCron extends ScheduleStatic {

  private task: cron.ScheduledTask;
  constructor(
    readonly functionMetadata: {
      target: any;
      propertyKey: string;
      descriptor: TypedPropertyDescriptor<
        (execution: ScheduledExecution) => void
      >;
    },
    readonly config: ScheduledCronConfig
  ) {
    super(annotationsType.CRON, functionMetadata, config);

    this.task = cron.schedule(config.cron, () =>  this.executeFunction(), {
      scheduled: false
    });
  }

  fillExecutionInfo(executionInfo: ScheduledExecution): ScheduledExecution {
    executionInfo.cron = this.config.cron;
    return executionInfo;
  }

  async start(): Promise<void> {
    this.task.start();
  }
  async stop(): Promise<void> {
    this.task.stop();
  }
}
