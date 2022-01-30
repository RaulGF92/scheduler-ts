import { Cron, ScheduledExecution } from "../../src";
import sinon from "ts-sinon";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const time = 1000 * 60 * 2;
jest.setTimeout(time + 8000);

test("it should print each times in logger", async () => {
  const spy = sinon.spy(console, "log");
  const log = (msg: string) => console.log(msg);

  class TestCronInLogger {
    @Cron("* * * * *")
    static sayHello(_execution: ScheduledExecution): void {
      log("Say Hello");
    }
  }

  await sleep(time);
  expect(TestCronInLogger).not.toBeNull();
  expect(spy.notCalled).toBeFalsy();
  expect(spy.getCalls().length).toEqual(2);
});
