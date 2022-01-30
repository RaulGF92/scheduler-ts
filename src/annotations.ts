import { annotationsType, ScheduledConfig, ScheduledExecution } from "./types";
import Utils from "./Utils";
import { v4 as uuidv4 } from "uuid";
import SchedulerFactory from "./factory/SchedulerFactory";
import Scheduler from "./Scheduler";

const extractConfig = (config: string | ScheduledConfig) => {
  let targetName = uuidv4().toString();
  if (!(typeof config === "string")) {
    config.name = config.name || targetName;
  } else {
    const targetCron = <string>config;
    config = <ScheduledConfig>{
      name: targetName,
      cron: targetCron,
    };
  }

  if (!Utils.isCron(config.cron))
    throw Error(`${config.cron} Doesn't follow cron statements`);

  return config;
};

const handleStaticFunction = (
  type: annotationsType,
  functionMetadata: {
    target: any;
    propertyKey: string;
    descriptor:
      | TypedPropertyDescriptor<(execution: ScheduledExecution) => void>
      | TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
  },
  config: ScheduledConfig
) => {
  const schedule = SchedulerFactory.getStaticSchedule(
    type,
    functionMetadata,
    <ScheduledConfig>config
  );
  Scheduler.add(schedule);
  Scheduler.start(<string>schedule.config.name);
};

const handleNonStaticFunction = (
  _type: annotationsType,
  _functionMetadata: {
    target: any;
    propertyKey: string;
    descriptor:
      | TypedPropertyDescriptor<(execution: ScheduledExecution) => void>
      | TypedPropertyDescriptor<(execution: ScheduledExecution) => void>;
  },
  _config: ScheduledConfig
) => {};

const createNewScheduleAnnotation = (
  type: annotationsType,
  configValid: ScheduledConfig,
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>
) => {
  const functionMetadata = { target, propertyKey, descriptor };

  /*
        When method is static, annotation layer pass a constructor but
        if the method is not static, annotation layer pass a instance with
        all variables to undefined.
        */
  const isNonAInstanceClass =
    typeof target === "function" &&
    !Object.getOwnPropertyNames(target).includes("constructor");

  if (isNonAInstanceClass) {
    handleStaticFunction(type, functionMetadata, <ScheduledConfig>configValid);
  } else {
    handleNonStaticFunction(
      type,
      functionMetadata,
      <ScheduledConfig>configValid
    );
  }
};


export function Cron(config: string | ScheduledConfig) {
    const type = annotationsType.CRON;
    const configValid: ScheduledConfig = extractConfig(config);
  
    return (
      target: any,
      propertyKey: string,
      descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>
    ) =>
      createNewScheduleAnnotation(
        type,
        configValid,
        target,
        propertyKey,
        descriptor
      );
  }

  export function Void(config: string | ScheduledConfig) {
    const type = annotationsType.VOID;
    const configValid: ScheduledConfig = extractConfig(config);
  
    return (
      target: any,
      propertyKey: string,
      descriptor: TypedPropertyDescriptor<(execution: ScheduledExecution) => void>
    ) =>
      createNewScheduleAnnotation(
        type,
        configValid,
        target,
        propertyKey,
        descriptor
      );
  }