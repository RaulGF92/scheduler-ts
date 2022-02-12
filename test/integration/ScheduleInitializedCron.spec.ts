import Scheduler, { Cron, ScheduledExecution } from '../../src';
import SchedulerFactory from '../../src/factory/SchedulerFactory';
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const time = 1000 * 5;
jest.setTimeout(time + 10000);

test('ScheduleInitializedCron shall emit event each cron time', async () => {
    let counter = 0;
    SchedulerFactory.emitter.on('CRON_job_my-test'.toLocaleUpperCase(), () => {
        counter += 1;
    });
    class TestScheduleInitializedCron {
        @Cron({
            name: 'my-test',
            cron: '* * * * * *',
        })
        public job(_executionInfo: ScheduledExecution) {
            // do things
        }
    }
    const instance = new TestScheduleInitializedCron();
    expect(instance).not.toBeNull();
    await sleep(time);
    Scheduler.stopAll();
    expect(counter >= 4).toBeTruthy();
});
