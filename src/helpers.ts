import { LogDecoratorOptions, LogDecoratorDefaultOptions } from "./LogDecoratorOptions";

function getClassName(instance: any): string {
  return instance.constructor ? instance.constructor.name : '';
}

interface LogMethodParams {
  argsValue: any[];
  method: any;
  methodName: string;
  options?: LogDecoratorOptions;
  returnValue?: any;
  start?: boolean;
  targetInstance: any;
}

export function logMethodStart({ targetInstance, method, methodName, argsValue, options }: LogMethodParams) {
  logMethod({
    start: true,
    targetInstance,
    method,
    methodName,
    argsValue,
    options
  });
}

export function logMethodEnd({ targetInstance, method, methodName, argsValue, returnValue, options }: LogMethodParams) {
  logMethod({
    start: false,
    targetInstance,
    method,
    methodName,
    argsValue,
    returnValue,
    options
  });
}

function logMethod({ start, targetInstance, method, methodName, argsValue, returnValue, options = LogDecoratorDefaultOptions }: LogMethodParams) {

  options = {
    ...LogDecoratorDefaultOptions,
    ...options
  }

  const logFunction = options.logFunction || LogDecoratorDefaultOptions.logFunction!;

  const className = getClassName(targetInstance);
  const args = getMethodArgs(method, argsValue)
    .map(el => `[${el.name}=${el.value}]`)
    .join(' ');
  const properties = getClassProperties(targetInstance)
    .map(el => `[${el.name} = ${el.value}]`)
    .join(' ');

  const now = new Date();

  const classNameDisplay = options.displayTime ? `[${now.toLocaleString()} - ${className}]` : `[${className}]`;

  logFunction(`${classNameDisplay} Method ${methodName} ${start ? 'start' : 'end'}`);

  if (options.displayFunctionArg) {
    logFunction(`\tArguments : ${args ? args : 'No arguments'}`);
  }

  if (options.displayClassProperties) {
    logFunction(`\t${className} properties : ${properties}`);
  }

  if (!start && options.displayReturnValue) {
    try {
      returnValue = JSON.stringify(returnValue)
    } catch (error) { }

    let returnDisplay = 'No return';

    if (returnValue) {
      const returnValueType = returnValue.constructor ? returnValue.constructor.name : '';
      returnDisplay = `${returnValueType} => ${returnValue}`;
    }

    logFunction(`\tReturn : ${returnDisplay}`);
  }
}

function getMethodArgs(method: any, argsValue: any[]): {
  name: string,
  value?: any
}[] {
  const str = method.toString();

  const argsName: string[] = str
    .substring(str.indexOf('(') + 1, str.indexOf(')'))
    .replace(/ /g, '')
    .split(',')
    .filter((el: string) => el);


  const args = argsName.map((name, index) => {
    return {
      name,
      value: argsValue[index]
    }
  });

  return args;
}

function getClassProperties(instance: any): {
  name: string,
  value?: any
}[] {
  return Object.getOwnPropertyNames(instance).map(name => {
    return {
      name,
      value: instance[name]
    }
  })
}

/**
 * Add log to method descriptor
 * @param method Method descriptor
 * @param methodName Method name
 */
export function addLogToMethod(method: Function, methodName: string, options?: LogDecoratorOptions): Function {
  return function (...args: any[]) {
    logMethodStart({ targetInstance: this, method, methodName, argsValue: args, options });
    const result = method.apply(this, args);
    logMethodEnd({ targetInstance: this, method, methodName, argsValue: args, returnValue: result, options });
    return result;
  }
}