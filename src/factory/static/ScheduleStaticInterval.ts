import { annotationsType, ScheduleIntervalConfig, ScheduledExecution } from "../..";
import ScheduleStatic from "./ScheduleStatic";

export default class ScheduleStaticInterval extends ScheduleStatic {
    intervalObj: NodeJS.Timer | undefined;
  
    constructor(
      readonly functionMetadata: {
        target: any;
        propertyKey: string;
        descriptor: TypedPropertyDescriptor<
          (execution: ScheduledExecution) => void
        >;
      },
      readonly config: ScheduleIntervalConfig
    ) {
      super(annotationsType.INTERVAL, functionMetadata, config);
    }
  
    async start(): Promise<void> {
        this.intervalObj = setInterval(() => this.executeFunction(), this.config.interval);
    }

    async stop(): Promise<void> {
        if(this.intervalObj) {
            clearInterval(this.intervalObj);
        }
    }
}