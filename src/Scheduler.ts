import { Schedule } from "./";

export default class Scheduler {
    items: Map<String, Schedule> = new Map();
    static singleton: Scheduler | null = null;
    private constructor() {}

    add(item: Schedule) {
        if(item.config.name && this.items.has(<string> item.config.name)) {
            throw new Error(`Name ${item.config.name} is not unique please create a unique name or left the name by default`);
        }
        this.items.set(<string> item.config.name, item);

        return item;
    }

    get(name: string) {
        return this.items.get(name);
    }

    // API - STATIC
    static add(schedule: Schedule) {
        return this.instance().add(schedule);
    }

    static get(name: string) {
        return this.instance().get(name);
    }

    static instance(): Scheduler {
        if(this.singleton == null) {
            this.singleton = new Scheduler();
        }
        return this.singleton;
    }
}