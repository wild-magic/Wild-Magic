import {
  createEngine,
  updateSystems,
  defaultEngineState,
  createEngineWithOptions,
} from '..';
import { createSystem } from '../../System';

describe('Engine System Functions', () => {
  describe('addSystem()', () => {
    it('should add the system to the engine', () => {
      const engine = createEngine();
      const system = createSystem({
        name: 'mySystem',
      });
      engine.addSystem(system);
      expect(engine.addSystem(system).systems[0]).toHaveProperty(
        'name',
        'mySystem',
      );
    });

    it('should call the system.added() function when added', () => {
      const engine = createEngine();
      const system = createSystem({
        name: 'mySystem',
      });
      const mockFn = jest.fn();
      system.added = mockFn;
      engine.addSystem(system);
      expect(mockFn.mock.calls.length).toBe(1);
    });
  });

  describe('updateSystem()', () => {
    it('should call the system.update() method on Tick', () => {
      const system = createSystem({
        name: 'mySystem',
      });
      const mockFn = jest.fn(() => system);
      system.update = mockFn;
      const engine = createEngineWithOptions({
        systems: [system],
      });
      engine.start();
      expect(mockFn.mock.calls.length).toBe(1);
    });
  });

  describe('removeSystem()', () => {
    it('should call the system.removed() method', () => {
      const system = createSystem({
        name: 'mySystem',
      });
      const mockFn = jest.fn(() => null);
      system.removed = mockFn;
      const engine = createEngineWithOptions({
        systems: [system],
      });
      engine.removeSystem('mySystem');
      expect(mockFn.mock.calls.length).toBe(1);
    });
  });
});
// describe('ProcessSystems', () => {
//   describe('updateSystems', () => {
//     it('should transform the systems in systemState', () => {
//       const processedEngineState = updateSystems((systems: System[]) =>
//         systems.map(key => 'banana'),
//       )({
//         ...defaultEngineState,
//         systems: ['not a banana at all!'],
//       });
//       expect(processedEngineState).toHaveProperty('systems', ['banana']);
//     });
//   });
// });
