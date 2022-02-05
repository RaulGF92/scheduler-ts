---
title: Scheduler TypeScript
description: Agnostic Framework Scheduler library for Typescript
---
[Scheduler](scheduler/index.md) | Cron | Interval
&nbsp;
&nbsp;
> The objective of scheduler in has the control of all internal jobs of a application and control the flow of application in an unique class.

# Features
- Execute static job function
- Handle jobs in central function

# Installation

Using npm:

```bash
npm install @raulgf92/scheduler-ts
```

# Usage
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

## Static Way

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

Then turn on the magic!!

```bash
PS C:\Users\raulg\test> node .  
Application bootstraping
Hello
Hola
Hello
Application end
```
