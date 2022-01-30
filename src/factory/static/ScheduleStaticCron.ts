import { annotationsType, ScheduledConfig, ScheduledExecution } from "../..";
import ScheduleStatic from "./ScheduleStatic";
import cron from 'node-cron';

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
    readonly config: ScheduledConfig
  ) {
    super(annotationsType.CRON, functionMetadata, config);

    this.task = cron.schedule(config.cron, () =>  this.executeFunction(), {
      scheduled: false
    });
  }

  async start(): Promise<void> {
    this.task.start();
  }
  async stop(): Promise<void> {
    this.task.stop();
  }
}
