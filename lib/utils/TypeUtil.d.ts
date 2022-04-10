declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
declare type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
export { Omit, Merge };
