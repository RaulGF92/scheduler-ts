import { ScheduledConfig, ScheduledExecution } from "./types";
import Utils from "./Utils";
import { v4 as uuidv4 } from 'uuid';
import SchedulerFactory from "./factory/SchedulerFactory";
import Scheduler from "./Scheduler";

export function Scheduled(config: string | ScheduledConfig) {
    let targetName = uuidv4().toString();

    if(!(typeof config === 'string')) {
        config.name = config.name || targetName;
    } else {
        const targetCron = <string> config;
        config = {
            name: targetName,
            cron: targetCron
        }
    }
        
    if(!Utils.isCron(config.cron))
        throw Error(`${config.cron} Doesn't follow cron statements`);

    return  (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>) => {
        // Crear una nueva instance de scheduled y almacenarla
        const functionMetadata = { target, propertyKey, descriptor};
        const schedule = SchedulerFactory.getStaticSchedule(functionMetadata, <ScheduledConfig> config);
        Scheduler.add(schedule);
    };
}