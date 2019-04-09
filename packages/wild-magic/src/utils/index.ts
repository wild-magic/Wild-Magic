export const compose = (...fns: Function[]) =>
  fns.reduce((f, g) => (...args: any[]) => f(g(...args)));

// @ts-ignore
export const isBrowser: boolean = typeof window !== 'undefined';

export const present = (): number => {
  if (!isBrowser) {
    process.hrtime()[1];
  }
  // @ts-ignore
  return performance.now();
};
