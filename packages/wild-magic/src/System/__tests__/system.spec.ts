import { createSystem } from '..';
import { AnySystem } from '../../Engine';

export const testForSystem = (system: AnySystem) => {
  expect(system).toHaveProperty('name');
  expect(system).toHaveProperty('add');
  expect(system).toHaveProperty('remove');
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
