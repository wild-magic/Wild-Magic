import Component, { createComponent } from '..';

describe('createComponent()', () => {
  const positionComponent = createComponent<{
    x: number;
    y: number;
    z: number;
  }>('position', {
    x: 0,
    y: 0,
    z: 0,
  });

  it('should be a function that returns an object', () => {
    expect(positionComponent()).toHaveProperty('name', 'position');
    expect(positionComponent()).toHaveProperty('data', {
      x: 0,
      y: 0,
      z: 0,
    });
  });

  it('should be able to have default properties replaced on init', () => {
    expect(
      // TODO how to make this fail type checking?!
      positionComponent({
        x: 'a',
      }),
    ).toHaveProperty('data', {
      x: 'a',
      y: 0,
      z: 0,
    });
  });
});
