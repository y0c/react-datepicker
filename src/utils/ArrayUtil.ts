export const chunk = (arr: any[], n: number) => {
  const result = [];
  let i = 0;
  while (i < arr.length / n) {
    result.push(arr.slice(i * n, i * n + n));
    i += 1;
  }

  return result;
};

export const range = (n1: number, n2?: number) => {
  const result = [];
  let first = !n2 ? 0 : n1;
  let last = n2;

  if (!last) {
    last = n1;
  }

  while (first < last) {
    result.push(first);
    first += 1;
  }
  return result;
};

export const repeat = (el: any, n: number) => {
  return range(n).map(() => el);
};
