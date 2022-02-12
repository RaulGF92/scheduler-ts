import { annotationsType, ScheduleIntervalConfig, ScheduledExecution } from '../../types';
import ScheduleInitialized from './ScheduleInitialized';

export default class ScheduleInitializedInterval extends ScheduleInitialized {
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

    async startJob(): Promise<void> {
        this.intervalObj = setInterval(() => this.executeFunction(), this.config.interval);
    }
    async stopJob(): Promise<void> {
        if (this.intervalObj) {
            clearInterval(this.intervalObj);
        }
    }
}
