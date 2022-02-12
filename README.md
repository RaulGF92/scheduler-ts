# Scheduler Typescript

> Agnostic Framework scheduler for Typescript using decorators

### Objective

The objective of scheduler in has the control of all internal jobs of a application and control the flow of application in an unique class.

## Features
- Execute static job function
- Handle jobs in central function

## Future Features
- Execute instanciate variable job function
- Create documentation page
- More utilities in Scheduler and Decorators

## Installation

Using npm:

```bash
npm install scheduler-ts
```

## Usage
You will need to import your class in your index.ts or in a subclass

```Typescript
// index.ts
import Jobs from './Jobs.ts'

const sleep = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
const app =async function() {
    console.log('Application bootstraping');
    await sleep(1000 * 60 * 2);
    console.log('Application end');
}
app()
    .then(() => {
        // grafully shutdown
        Scheduler.stopAll();
    });
```
Then you could implement your Jobs in different ways:

### Static Way

You can put a decorator in any **static** function and this function will be invoked each time

```Typescript
// Jobs.ts
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
```
output
```bash
Application bootstraping
Hello
Hola
Hello
Application end
```

### Scheduler - the main object

Scheduler is a main class where you could setting the whole jobs in here you could start all, stop all, stop one task....

- Stop all jobs of app

```Typescript
import Scheduler from 'scheduler-ts'; // Singleton instance you could invoker what ever you want!!

Scheduler.stopAll();
```
- Stop all jobs of app

```Typescript
import Scheduler from 'scheduler-ts'; // Singleton instance you could invoker what ever you want!!

Scheduler.startAll();
```

- Retreive all jobs of app

```Typescript
import Scheduler from 'scheduler-ts'; // Singleton instance you could invoker what ever you want!!

Scheduler.getAll();
```
- Remove all jobs of app

```Typescript
import Scheduler from 'scheduler-ts'; // Singleton instance you could invoker what ever you want!!

Scheduler.removeAll();
```
All apply same actions to specific job by name
```Typescript
import Scheduler from 'scheduler-ts'; // Singleton instance you could invoker what ever you want!!

Scheduler.start('my-job');
Scheduler.stop('my-job');
Scheduler.get('my-job'); // ...
```
