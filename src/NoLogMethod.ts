/**
 * Disable log for a method
 *
 * @returns {MethodDecorator}
 */
export function NoLogMethod(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    const method = target[propertyKey];
    method.__noLog = true;
    return method;
  }
}