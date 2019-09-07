import { addLogToMethod } from "./helpers";
import { LogDecoratorOptions, LogDecoratorDefaultOptions } from "./LogDecoratorOptions";

/**
 * Log all methods of a class
 *
 * @returns {ClassDecorator}
 */
export function LogClass(options: LogDecoratorOptions = LogDecoratorDefaultOptions): ClassDecorator {
  return function <TFunction extends Function>(target: TFunction): TFunction {
    for (const key in target.prototype) {
      if (target.prototype.hasOwnProperty(key)) {
        const element: any = target.prototype[key];
        if (!element.__noLog || element.__logSet) {
          target.prototype[key] = addLogToMethod(element, key, options);
        }
      }
    }
    return target;
  }
}