---
title: Scheduler TypeScript
description: Agnostic Framework Scheduler library for Typescript
---
[Home](../index.md) | [Scheduler](../scheduler/index.md) | **@Cron** | [@Interval](../annotations/interval/index.md)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
# @Cron - the cron statement repeater

## Usage
Cron accepts string with cron format

```Typescript
    @Cron("* */2 * * * *")
    static sayHello(execution: ScheduledExecution) {
        console.log("Hello");
    }
```

but also could be load with complex object follow [Scheduler Cron Options](#scheduler-cron-options)

```Typescript
    @Cron({
        name: 'my-job',
        cron: "* */2 * * * *"
    })
    static sayHello(execution: ScheduledExecution) {
        console.log("Hello");
    }
```
# Cron structure

Scheduler TypeScript use the library [node-cron](https://www.npmjs.com/package/node-cron) under the roof, so the cron will be posible following here instructions but in resume:

This is a quick reference to cron syntax and also shows the options supported by node-cron.

### Allowed fields

```
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

### Allowed values

|     field    |        value        |
|--------------|---------------------|
|    second    |         0-59        |
|    minute    |         0-59        |
|     hour     |         0-23        |
| day of month |         1-31        |
|     month    |     1-12 (or names) |
|  day of week |     0-7 (or names, 0 or 7 are sunday)  |


# Scheduler Cron Options

```Typescript
{
    name: string, // optional parameter
    cron: string
}

```

