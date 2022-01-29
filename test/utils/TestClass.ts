import { Scheduled, ScheduledExecution } from '../../src/index';

export default class TestClass {

    @Scheduled("5 4 * * *")
    static entrypoint(execution: ScheduledExecution) {
        console.log("Entra", execution);
    }
}