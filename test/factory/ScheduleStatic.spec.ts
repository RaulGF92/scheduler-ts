import { annotationsType, ScheduledConfig, ScheduledExecution } from "../../src";
import ScheduleStatic from "../../src/factory/static/ScheduleStatic";

test('it should invoke a static method', async () => {
    const config = {
        name: 'ScheduleStatic-mock',
        cron: 'cron'
    };

    class Test {
        public static entrypoint(execution: ScheduledExecution) {
            expect(execution.cron).toEqual(config.cron);
            expect(execution.name).toEqual(config.name);
            expect(execution.startDate).not.toBeNull()
        }
    }

    class UselessScheduleStatic extends ScheduleStatic {

        constructor(
            readonly functionMetadata: {
              target: any;
              propertyKey: string;
              descriptor: TypedPropertyDescriptor<
                (execution: ScheduledExecution) => void
              >;
            },
            readonly config: ScheduledConfig
          ) {
            super(annotationsType.CRON, functionMetadata, config);
        }

        start(): Promise<void> {
            throw new Error("Method not implemented.");
        }
        stop(): Promise<void> {
            throw new Error("Method not implemented.");
        }

    }

    const functionMetadata = {
        target: Test,
        propertyKey: "entrypoint",
        descriptor: < TypedPropertyDescriptor<(execution: ScheduledExecution) => void>> Test.entrypoint
    };
    const instance = new UselessScheduleStatic(functionMetadata, <ScheduledConfig> config);
    await instance.executeFunction();
});