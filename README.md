# Scheduler Typescript

> Agnostic Framework scheduler for in Typescript using decorators

### Objective

The objective of scheduler in has the control of all internal jobs of a application and control the flow of application.

# How use it?

### Static Way

You can put a decorator in any **static** function and this function will be invoked each time
````
import {Cron, Interval, ScheduledExecution} from 'scheduler-ts';

export default class Jobs {

    @Cron("* */2 * * * *")
    static sayHello(execution: ScheduledExecution) {
        console.log("Hello");
    }

    @Interval(1000 * 60)
    static sayHola(execution: ScheduledExecution) {
        console.log("Hola");
    }
    
}
````