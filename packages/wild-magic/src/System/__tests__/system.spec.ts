import { createSystem, System } from '..';

export const testForSystem = (system: System) => {
  expect(system).toHaveProperty('name');
  expect(system).toHaveProperty('added');
  expect(system).toHaveProperty('removed');
  expect(system).toHaveProperty('update');
};

describe('Systems', () => {
  describe('createSystem', () => {
    it('should create a system with all the appropriate properties', () => {
      const mySystem = createSystem({ name: 'hello' });
      testForSystem(mySystem);
    });
  });
});
