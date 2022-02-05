import { Schedule } from "./";

export default class Scheduler {
  items: Record<string, Schedule> = {};
  static singleton: Scheduler | null = null;
  private constructor() {}

  add(item: Schedule) {
    if (item.config.name && this.items[<string>item.config.name]) {
      throw new Error(
        `Name ${item.config.name} is not unique please create a unique name or left the name by default`
      );
    }
    this.items[<string>item.config.name] = item;

    return item;
  }

  get(name: string) {
    return this.items[name];
  }

  // API - STATIC
  static add(schedule: Schedule) {
    return this.instance().add(schedule);
  }

  static start(name: string) {
    const instance = this.instance();
    const schedule = instance.get(name);

    if (schedule) {
      schedule.start();
    }
  }

  static stop(name: string) {
    const instance = this.instance();
    const schedule = instance.get(name);

    if (schedule) {
      schedule.stop();
    }
  }

  static get(name: string) {
    return Object.freeze(this.instance().get(name));
  }

  static remove(name: string) {
    const instance = this.instance();
    const item = this.get(name);

    if (item) {
      item.stop();
      instance.items[name] = <any>null; // force garbage collector
      delete instance.items[name];
    }
  }

  static removeAll(name: string) {
    const instance = this.instance();
    Object.keys(instance.items).forEach((key) => {
      const item = this.get(key);
      if (item) {
        item.stop();
        instance.items[name] = <any> null; // force garbage collector
        delete instance.items[name];
      }
    });
  }

  static startAll() {
    const instance = this.instance();
    Object.values(instance.items).forEach((item) => item.start());
  }

  static stopAll() {
    const instance = this.instance();
    Object.values(instance.items).forEach((item) => item.stop());
  }

  static getAll() {
    const instance = this.instance();
    return Object.freeze(Object.values(instance.items));
  }

  static instance(): Scheduler {
    if (this.singleton == null) {
      this.singleton = new Scheduler();
    }
    return this.singleton;
  }
}
