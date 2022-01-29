import { ScheduledExecution } from "../../src";
import ScheduleStatic from "../../src/factory/ScheduleStatic";

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

    const functionMetadata = {
        target: Test,
        propertyKey: "entrypoint",
        descriptor: < TypedPropertyDescriptor<(execution: ScheduledExecution) => void>> Test.entrypoint
    };
    const instance = new ScheduleStatic(functionMetadata, config);
    await instance.executeFunction();
});