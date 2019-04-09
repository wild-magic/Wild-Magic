import { compose, pipe } from '..';
const f1 = (value: string) => `${value}a`;
const f2 = (value: string) => `${value}r`;
const f3 = (value: string) => `${value}t`;

describe('compose()', () => {
  it('should combine values right to left', () => {
    expect(
      compose(
        f3,
        f2,
        f1,
      )('f'),
    ).toBe('fart');
  });
});

describe('pipe()', () => {
  it('should combine values left to right', () => {
    expect(
      pipe(
        f1,
        f2,
        f3,
      )('f'),
    ).toBe('fart');
  });
});
