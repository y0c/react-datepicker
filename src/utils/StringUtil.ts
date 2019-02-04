export const lpad = (val: string, length: number, char: string = '0') =>
  val.length < length ? char.repeat(length - val.length) + val : val;
