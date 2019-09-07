# Usage

## LogClass

Add `@LogClass()` on top of the class definition to log all class methods

```typescript
@LogClass()
export class LoggedClass {
  private x = 2;
  loggedMethod(a: number) {
    this.x = 3;
    return this.x;
  }
}
```

Output will be

```
[9/7/2019, 3:04:16 PM - LoggedClass] Method loggedMethod start
        Arguments : [a=1]
        LoggedTestClass properties : [x = 2]
[9/7/2019, 3:04:16 PM - LoggedClass] Method loggedMethod end
        Arguments : [a=1]
        LoggedTestClass properties : [x = 3]
        Return : String => 3
```

## LogMethod

Add `@LogMethod()` on top of method definition to log the method start and end.

```typescript
@LogMethod()
loggedMethod(a = 2) {
  return a;
}
```

Output will be

```
[LoggedTestMethod] Method loggedMethod start
        Arguments : [a=undefined]
        LoggedTestMethod properties :
[LoggedTestMethod] Method loggedMethod end
        Arguments : [a=undefined]
        LoggedTestMethod properties :
        Return : String => 2
```

## NoLogMethod

Add `@NoLogMethod()` on top of method definition to disable log for this method.

```typescript
@NoLogMethod()
noLogMethod() { }
```

## Options

You can pass an options object to `LogClass` and `LogMethod` decorators.

```typescript
@LogClass({
  displayClassProperties: false,
  displayFunctionArg: false,
  displayReturnValue: false,
  displayTime: true
})
export class ... {}
```

Options follow this interface :

```typescript
export interface LogDecoratorOptions {
  displayClassProperties?: boolean;
  displayFunctionArg?: boolean;
  displayReturnValue?: boolean;
  displayTime?: boolean;
  logFunction?: (message?: any, ...optionalParams: any[]) => void;
}
```

- **displayClassProperties** - If `true`, display properties of the class
- **displayFunctionArg** - If `true`, display method arguments
- **displayReturnValue** - If `true`, display returned value
- **displayTime** - If `true`, display log time
- **logFunction** - Log function to use

Default options are

```typescript
const LogDecoratorDefaultOptions: LogDecoratorOptions = {
  displayClassProperties: true,
  displayFunctionArg: true,
  displayReturnValue: true,
  displayTime: false,
  logFunction: console.log
};
```
