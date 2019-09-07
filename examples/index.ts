import { LoggedTestClass } from "./LoggedTestClass";
import { LoggedTestMethod } from "./LoggedTestMethod";

const loggedClass = new LoggedTestClass();
const loggedMethod = new LoggedTestMethod();

loggedClass.loggedMethod(1);
loggedClass.noLoggedMethod()
loggedMethod.loggedMethod();
loggedMethod.partiallyLoggedMethod();