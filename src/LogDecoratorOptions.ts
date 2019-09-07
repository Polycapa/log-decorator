export interface LogDecoratorOptions {
  displayClassProperties?: boolean;
  displayFunctionArg?: boolean;
  displayReturnValue?: boolean;
  displayTime?: boolean;
  logFunction?: (message?: any, ...optionalParams: any[]) => void;
}

export const LogDecoratorDefaultOptions: LogDecoratorOptions = {
  displayClassProperties: true,
  displayFunctionArg: true,
  displayReturnValue: true,
  displayTime: false,
  logFunction: console.log
};
