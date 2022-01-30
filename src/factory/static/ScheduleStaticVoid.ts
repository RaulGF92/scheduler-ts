import { annotationsType, ScheduledConfig, ScheduledExecution } from "../..";
import ScheduleStatic from "./ScheduleStatic";

export default class ScheduleStaticVoid extends ScheduleStatic {
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
    super(annotationsType.VOID, functionMetadata, config);
  }

  async start(): Promise<void> {
    return;
  }
  async stop(): Promise<void> {
    return; 
  }
}
