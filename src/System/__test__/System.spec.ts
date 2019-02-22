import System from '../';

describe('System', () => {
  it('shoud assing an onUpdate callback on init', () => {
    const myCallback = () => {};
    const myInitCallback = () => null;
    const mySystem = new System({
      name: 'mySystem',
      onInit: myInitCallback,
      onUpdate: myCallback,
    });
    expect(mySystem).toHaveProperty('handleUpdate', myCallback);
    expect(mySystem).toHaveProperty('handleInit', myInitCallback);
    expect(mySystem).toHaveProperty('name', 'mySystem');
  });
});
