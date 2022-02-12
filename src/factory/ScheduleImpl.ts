import {
    annotationsType,
    ScheduledConfig,
    ScheduledExecution,
    Schedule,
    scheduleState,
    invokationType,
} from '../types';

export default abstract class ScheduleImpl implements Schedule {
    state: scheduleState = scheduleState.STOP;
    constructor(
        readonly type: annotationsType,
        readonly functionMetadata: {
            target: any;
            propertyKey: string;
            descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
        },
        readonly config: ScheduledConfig,
        readonly invokationType: invokationType,
    ) {}

    buildScheduledExecution(): ScheduledExecution {
        return this.fillExecutionInfo(<ScheduledExecution>{
            startDate: new Date(),
            name: this.config.name,
            type: this.type,
            invokationType: this.invokationType,
        });
    }

    async executeFunction(): Promise<void> {
        this.state = scheduleState.RUNNING;
        try {
            this.executeJob();
        } catch (error) {
            console.trace(error);
        } finally {
            this.state = scheduleState.START;
        }
    }

    async start() {
        try {
            this.startJob();
        } catch (error) {
            console.trace(error);
        } finally {
            this.state = scheduleState.START;
        }
    }

    async stop() {
        try {
            this.stopJob();
        } catch (error) {
            console.trace(error);
        } finally {
            this.state = scheduleState.STOP;
        }
    }

    abstract fillExecutionInfo(executionInfo: ScheduledExecution): ScheduledExecution;
    abstract executeJob(): Promise<void>;
    abstract startJob(): Promise<void>;
    abstract stopJob(): Promise<void>;
}
