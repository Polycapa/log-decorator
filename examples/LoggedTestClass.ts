import { LogClass, NoLogMethod } from "../src";

@LogClass({
  displayTime: true
})
export class LoggedTestClass {
  private x = 2;

  loggedMethod(a: number, b?: string) {
    this.x = 3;
    return this.x;
  }

  @NoLogMethod()
  noLoggedMethod() {

  }
}