import { createEngine, countLatestTick, defaultEngineState, tick } from '../';
import { testForEngineState } from './engine.spec';

describe('Tick', () => {
  describe('countLatestTick', () => {
    it('should subtract present from the latestTick passed in', () => {
      const tickedState = countLatestTick(() => 4)({
        ...defaultEngineState,
        latestTick: 2,
      });
      testForEngineState(tickedState);
      expect(tickedState).toHaveProperty('latestTick', 2);
    });
  });

  describe('tick()', () => {
    it('should return a ticked engineState if isRunning is true', () => {
      const tickedState = tick(engineState => engineState)(
        countLatestTick(() => 990),
      )({
        ...defaultEngineState,
        isRunning: true,
        latestTick: 989,
      });
      testForEngineState(tickedState);
      expect(tickedState).toHaveProperty('latestTick', 1);
    });

    it('should not tick the state if isRunning is false', () => {
      const tickedState = tick(engineState => engineState)(
        countLatestTick(() => 4),
      )({
        ...defaultEngineState,
        latestTick: 989,
      });
      testForEngineState(tickedState);
      expect(tickedState).toHaveProperty('latestTick', 989);
    });
  });
});
