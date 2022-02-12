import Scheduler from '../../src/Scheduler';
import { Schedule } from '../../src/types';

test('scheduler must be an singleton pattern', () => {
    const instance1 = Scheduler.instance();
    const instance2 = Scheduler.instance();
    expect(instance1).toEqual(instance2);
});

test('scheduler must add and get schedule items', () => {
    const schedule = <Schedule>{
        config: {
            name: 'a',
        },
        functionMetadata: {},
    };
    Scheduler.add(schedule);
    expect(Scheduler.get('a')).toEqual(schedule);
});

test('scheduler must throw an Error when two items has the same name', () => {
    const schedule = <Schedule>{
        config: {
            name: 'b',
        },
        functionMetadata: {},
    };
    Scheduler.add(schedule);
    expect(() => Scheduler.add(schedule)).toThrow();
});
