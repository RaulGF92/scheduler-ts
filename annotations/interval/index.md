---
title: Scheduler TypeScript
description: Agnostic Framework Scheduler library for Typescript
---
[Home](../index.md) | [Scheduler](../scheduler/index.md) | [@Interval](../annotations/Interval/index.md) | **@Interval**
&nbsp;
&nbsp;
&nbsp;
&nbsp;
# @Interval - The milliseconds repeater

## Usage
Interval accepts millis intervals

```Typescript
    @Interval(12000)
    static sayHello(execution: ScheduledExecution) {
        console.log("Hello");
    }
```

but also could be load with complex object follow [Scheduler Interval Options](#scheduler-Interval-options)

```Typescript
    @Interval({
        name: 'my-job',
        interval: 12000
    })
    static sayHello(execution: ScheduledExecution) {
        console.log("Hello");
    }
```
# Scheduler Interval Options

```Typescript
{
    name: string, // optional parameter
    interval: number
}

```

