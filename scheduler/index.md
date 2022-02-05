---
title: Scheduler TypeScript
description: Agnostic Framework Scheduler library for Typescript
---
[Home](../index.md) | **Scheduler** | Cron | Interval
&nbsp;
&nbsp;
# Scheduler - the main object

Scheduler is a main class where you could setting the whole jobs in here you could start all, stop all, stop one task....

# [#](#stop-all-jobs)Stop all jobs of app

```Typescript
import Scheduler from 'scheduler-ts';

Scheduler.stopAll();
```
# [#](#start-all-jobs)Start all jobs of app

```Typescript
import Scheduler from 'scheduler-ts';

Scheduler.startAll();
```

# [#](#retrieve-all-jobs-of-app)Retreive all jobs of app

```Typescript
import Scheduler from 'scheduler-ts';

Scheduler.getAll();
```
# [#](#remove-all-jobs-of-app)Remove all jobs of app

```Typescript
import Scheduler from 'scheduler-ts';

Scheduler.removeAll();
```
# [#](#all-apply-same-actions-to-specific-job-by-name)All apply same actions to specific job by name

```Typescript
import Scheduler from 'scheduler-ts';

Scheduler.start('my-job');
Scheduler.stop('my-job');
Scheduler.get('my-job'); // ...
```