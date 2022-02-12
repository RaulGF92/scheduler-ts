import { annotationsType, ScheduledExecution, ScheduleIntervalConfig } from '../../types';
import ScheduleStatic from './ScheduleStatic';

export default class ScheduleStaticInterval extends ScheduleStatic {
    intervalObj: NodeJS.Timer | undefined;

    constructor(
        readonly functionMetadata: {
            target: any;
            propertyKey: string;
            descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
        },
        readonly config: ScheduleIntervalConfig,
    ) {
        super(annotationsType.INTERVAL, functionMetadata, config);
    }

    fillExecutionInfo(executionInfo: ScheduledExecution): ScheduledExecution {
        executionInfo.interval = this.config.interval;
        return executionInfo;
    }

    async start(): Promise<void> {
        this.intervalObj = setInterval(() => this.executeFunction(), this.config.interval);
    }

    async stop(): Promise<void> {
        if (this.intervalObj) {
            clearInterval(this.intervalObj);
        }
    }
}
