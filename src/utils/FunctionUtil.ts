export const ifExistCall = (func?: (...args: any[]) => void, ...args: any[]) =>
  func && func(...args);
