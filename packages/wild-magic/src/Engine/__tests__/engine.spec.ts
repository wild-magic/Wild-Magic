import { createEngine } from '../';
import { Engine, EngineState } from '../types';

export const testForEngineState = (engineState: EngineState) => {
  expect(engineState).toHaveProperty('isRunning');
  expect(engineState).toHaveProperty('systems');
  expect(engineState).toHaveProperty('components');
  expect(engineState).toHaveProperty('latestTick');
};

export const testForEngine = (engine: Engine) => {
  expect(engine).toHaveProperty('isRunning');
  expect(engine).toHaveProperty('systems');
  expect(engine).toHaveProperty('components');
  expect(engine).toHaveProperty('latestTick');
  expect(engine).toHaveProperty('start');
  expect(engine).toHaveProperty('stop');
  expect(engine).toHaveProperty('addSystem');
  expect(engine).toHaveProperty('removeSystem');
};

describe('Engine', () => {
  describe('createEngine', () => {
    it('should have a test', () => {
      expect(createEngine).toBeDefined();
    });

    it('should return engineState', () => {
      const engine = createEngine();
      testForEngine(engine);
    });

    describe('tick', () => {
      it('should increment the latest tick', () => {
        const engine = createEngine()
          .start()
          .tick();
        testForEngine(engine);
        expect(engine).toHaveProperty('latestTick');
        expect(engine.latestTick).toBeGreaterThan(0);
      });
    });
  });
});
