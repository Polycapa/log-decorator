import { addLogToMethod } from "./helpers";
import { LogDecoratorOptions, LogDecoratorDefaultOptions } from "./LogDecoratorOptions";

/**
 * Log a method start and end
 *
 * @returns {MethodDecorator}
 */
export function LogMethod(options: LogDecoratorOptions = LogDecoratorDefaultOptions): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    const method = target[propertyKey];
    descriptor.value = addLogToMethod(method, propertyKey.toString(), options);
    descriptor.value.__logSet = true;
    return descriptor;
  }
}