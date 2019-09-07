import { LogMethod } from "../src";

export class LoggedTestMethod {

  @LogMethod()
  loggedMethod(a = 2) {
    return a;
  }

  @LogMethod({
    displayTime: false,
    displayFunctionArg: false
  })
  partiallyLoggedMethod() {

  }

}