import { Constants } from "../../common/constants/constants";

export const processSearchingQueue = (queue: string[], searching: string) => {
  if (queue.includes(searching)) {
    queue.splice(queue.indexOf(searching), 1);
    queue.unshift(searching);
  } else {
    // set while beacuse sometimes i had bug, when app doesn't remove element,
    // and next time it showes 4 elements
    while (queue.length >= Constants.MAX_SEARCHING_QUEUE_SIZE) {
      queue.pop();
    }
    queue.unshift(searching);
  }
  saveSearchingHistory(queue);
  return queue;
};

export const saveSearchingHistory = (queue: string[]) => {
  if (queue.length !== 0) {
    localStorage.setItem(
      Constants.SEARCHING_HISTORY_STORAGE_KEY,
      JSON.stringify(queue)
    );
  }
};
export const getSearchingHistory = (): string[] => {
  const queue = localStorage.getItem(Constants.SEARCHING_HISTORY_STORAGE_KEY);

  if (queue) {
    return JSON.parse(queue);
  }
  return [];
};

abstract class ValideTest {
  testResult: boolean;
  errorMessage: string;
  constructor() {
    this.testResult = true;
    this.errorMessage = "";
  }
  validate(value: string): boolean {
    return true;
  }
  getErrorMessage(): string {
    return this.errorMessage;
  }
}
class EmptinessTest extends ValideTest {
  errorMessage = "Empty field";
  validate(value: string): boolean {
    return value.length !== 0;
  }
}
class LengthTest extends ValideTest {
  errorMessage = "Invalid VIN code length";
  validate(value: string): boolean {
    return value.length <= Constants.VIN_CODE_LENGTH;
  }
}
class ForbiddenSymbolsTest extends ValideTest {
  errorMessage = "Forbidden symbols in VIN";
  validate(value: string): boolean {
    return /^[A-HJ-NPR-Z0-9]{1,17}$/.test(value);
  }
}
export const validateForm = (value: string): string => {
  let result = "";
  const tests = [
    new EmptinessTest(),
    new ForbiddenSymbolsTest(),
    new LengthTest(),
  ];
  tests.forEach((test) => {
    if (!test.validate(value)) {
      console.log(test.getErrorMessage())
      result = test.getErrorMessage();
      return;
    }
  });
  return result;
};
