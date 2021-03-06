import { annotationsType, ScheduledConfig, ScheduledExecution } from '../../types';
import ScheduleStatic from './ScheduleStatic';

export default class ScheduleStaticVoid extends ScheduleStatic {
    constructor(
        readonly functionMetadata: {
            target: any;
            propertyKey: string;
            descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
        },
        readonly config: ScheduledConfig,
    ) {
        super(annotationsType.VOID, functionMetadata, config);
    }

    fillExecutionInfo(executionInfo: ScheduledExecution): ScheduledExecution {
        return executionInfo;
    }

    async startJob(): Promise<void> {
        return;
    }
    async stopJob(): Promise<void> {
        return;
    }
}
