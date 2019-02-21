import System from '../';

describe('System', () => {
  it('shoud assing an onUpdate callback on init', () => {
    const myCallback = () => {};
    const mySystem = new System({
      onUpdate: myCallback,
    });
    expect(mySystem).toHaveProperty('update', myCallback);
  });
});
