import { updateSystems, System, defaultEngineState } from '..';

describe('ProcessSystems', () => {
  describe('updateSystems', () => {
    it('should transform the systems in systemState', () => {
      const processedEngineState = updateSystems((systems: System[]) =>
        systems.map(key => 'banana'),
      )({
        ...defaultEngineState,
        systems: ['not a banana at all!'],
      });
      expect(processedEngineState).toHaveProperty('systems', ['banana']);
    });
  });
});
