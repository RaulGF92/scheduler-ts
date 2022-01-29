export interface ScheduledConfig {
    name?: string,
    cron: string
}

export interface ScheduledExecution {
    name: string,
    startDate: Date,
    cron: string
}

export interface Schedule {
    readonly functionMetadata: {
      target: any;
      propertyKey: string;
      descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
    };
    readonly config: ScheduledConfig;
    executeFunction(): Promise<void>;
  }
  