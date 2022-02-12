import { ScheduledConfig, ScheduledExecution } from '../..';
import ScheduleImpl from '../ScheduleImpl';
import { annotationsType, invokationType } from '../../types';
import SchedulerFactory from '../SchedulerFactory';

export default abstract class ScheduleInitialized extends ScheduleImpl {
    constructor(
        readonly type: annotationsType,
        readonly functionMetadata: {
            target: any;
            propertyKey: string;
            descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
        },
        readonly config: ScheduledConfig,
    ) {
        super(type, functionMetadata, config, invokationType.INITIALIZED);
    }

    public static buildADN(
        type: annotationsType,
        functionMetadata: {
            target: unknown;
            propertyKey: string;
            descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
        },
        config: ScheduledConfig,
    ) {
        return `${type}_${functionMetadata.propertyKey}_${config.name}`.toLocaleUpperCase();
    }

    async executeJob(): Promise<void> {
        const eventName = ScheduleInitialized.buildADN(this.type, this.functionMetadata, this.config);
        SchedulerFactory.emitter.emit(eventName, super.buildScheduledExecution());
    }

    abstract fillExecutionInfo(executionInfo: ScheduledExecution): ScheduledExecution;
    abstract startJob(): Promise<void>;
    abstract stopJob(): Promise<void>;
}
