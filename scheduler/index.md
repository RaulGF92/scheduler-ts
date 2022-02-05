# Scheduler TypeScript

[Home](../index.md) | **Scheduler** | Cron | Interval

# Scheduler - the main object

Scheduler is a main class where you could setting the whole jobs in here you could start all, stop all, stop one task....

# [#](#stopalljobs) Stop all jobs of app []{#stopalljobs}

```Typescript
import Scheduler from 'scheduler-ts'; // Singleton instance you could invoker what ever you want!!

Scheduler.stopAll();
```
# [#]{#startalljobs} Start all jobs of app

```Typescript
import Scheduler from 'scheduler-ts'; // Singleton instance you could invoker what ever you want!!

Scheduler.startAll();
```

# [#]{#retrievealljobs} Retreive all jobs of app

```Typescript
import Scheduler from 'scheduler-ts'; // Singleton instance you could invoker what ever you want!!

Scheduler.getAll();
```
# [#]{#removealljobs} Remove all jobs of app

```Typescript
import Scheduler from 'scheduler-ts'; // Singleton instance you could invoker what ever you want!!

Scheduler.removeAll();
```
# [#]{#applyspecificjobs} All apply same actions to specific job by name

```Typescript
import Scheduler from 'scheduler-ts'; // Singleton instance you could invoker what ever you want!!

Scheduler.start('my-job');
Scheduler.stop('my-job');
Scheduler.get('my-job'); // ...
```