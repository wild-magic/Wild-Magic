// Right to left ordering of operations
export const compose = (...fns: Function[]) => (x: any) =>
  fns.reduceRight((v, f) => f(v), x);

// Left to right ordering of operations (more natural, for me)
export const pipe = (...fns: Function[]) => (x: any) =>
  fns.reduce((v, f) => f(v), x);

// Are we in the browser ?
export const isBrowser: boolean = typeof window !== 'undefined';

//
export const present = (): number =>
  isBrowser ? performance.now() : process.hrtime()[1];
