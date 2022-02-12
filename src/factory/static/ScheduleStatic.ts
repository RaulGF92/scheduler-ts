import { ScheduledConfig, ScheduledExecution } from '../..';
import ScheduleImpl from '../ScheduleImpl';
import { annotationsType, invokationType } from '../../types';

export default abstract class ScheduleStatic extends ScheduleImpl {
    constructor(
        readonly type: annotationsType,
        readonly functionMetadata: {
            target: any;
            propertyKey: string;
            descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
        },
        readonly config: ScheduledConfig,
    ) {
        super(type, functionMetadata, config, invokationType.STATIC);
    }

    async executeJob(): Promise<void> {
        const { target, propertyKey } = this.functionMetadata;
        await target[propertyKey](super.buildScheduledExecution());
    }

    abstract fillExecutionInfo(executionInfo: ScheduledExecution): ScheduledExecution;
    abstract startJob(): Promise<void>;
    abstract stopJob(): Promise<void>;
}
