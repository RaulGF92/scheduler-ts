import { annotationsType, ScheduledCronConfig, ScheduledExecution } from '../../types';
import ScheduleInitialized from './ScheduleInitialized';

export default class ScheduleInitializedVoid extends ScheduleInitialized {
    constructor(
        readonly functionMetadata: {
            target: any;
            propertyKey: string;
            descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
        },
        readonly config: ScheduledCronConfig,
    ) {
        super(annotationsType.VOID, functionMetadata, config);
    }

    fillExecutionInfo(executionInfo: ScheduledExecution): ScheduledExecution {
        executionInfo.cron = this.config.cron;
        return executionInfo;
    }

    async startJob(): Promise<void> {
        return;
    }
    async stopJob(): Promise<void> {
        return;
    }
}
