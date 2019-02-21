export const isBrowser: boolean = typeof window !== 'undefined';

export const present = (): number => {
  if (!isBrowser) {
    process.hrtime()[1];
  }
  return performance.now();
};
