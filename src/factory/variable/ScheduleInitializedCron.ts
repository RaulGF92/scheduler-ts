import { annotationsType, ScheduledCronConfig, ScheduledExecution } from '../../types';
import ScheduleInitialized from './ScheduleInitialized';
import * as cron from 'node-cron';

export default class ScheduleInitializedCron extends ScheduleInitialized {
    private task: cron.ScheduledTask;
    constructor(
        readonly functionMetadata: {
            target: any;
            propertyKey: string;
            descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
        },
        readonly config: ScheduledCronConfig,
    ) {
        super(annotationsType.CRON, functionMetadata, config);

        this.task = cron.schedule(config.cron, () => super.executeFunction(), this.config);
    }

    fillExecutionInfo(executionInfo: ScheduledExecution): ScheduledExecution {
        executionInfo.cron = this.config.cron;
        return executionInfo;
    }

    async startJob(): Promise<void> {
        this.task.start();
    }
    async stopJob(): Promise<void> {
        this.task.stop();
    }
}
