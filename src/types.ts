export enum invokationType {
  STATIC,
  INITIALIZED,
}

export enum annotationsType {
  CRON,
  INTERVAL,
  TIMEOUT,
  VOID,
}

export enum scheduleState {
  START,
  RUNNING,
  STOP,
}

export interface ScheduledConfig {
  name?: string;
}

export interface ScheduledCronConfig extends ScheduledConfig {
  cron: string;
}

export interface ScheduleIntervalConfig extends ScheduledConfig {
  interval: number;
}

export interface ScheduledExecution {
  name: string;
  startDate: Date;
  cron: string;
}

export interface Schedule {
  type: annotationsType;
  state: scheduleState;
  invokationType: invokationType;
  readonly functionMetadata: {
    target: any;
    propertyKey: string;
    descriptor: TypedPropertyDescriptor<
      (execution: ScheduledExecution) => void
    >;
  };
  readonly config: ScheduledConfig;
  executeFunction(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
}
