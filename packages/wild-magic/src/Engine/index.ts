import { compose, present } from '../utils';

export interface EngineState {
  isRunning: boolean;
  systems: any[];
  components: any[];
  latestTick: number;
}

export const engineDefaultState: EngineState = {
  isRunning: false,
  systems: [],
  components: [],
  latestTick: 0,
};

export const processSystem = (system: any) => {
  processed: 'processed!';
};

export const makeTick = (updateSystems: (systems: any[]) => any[]) => (
  present: () => number,
) => (engineState: EngineState) =>
  engineState.isRunning
    ? {
        ...engineState,
        // do system things here!
        systems: updateSystems(engineState.systems),
        latestTick: present(),
      }
    : engineState;

export const tick = makeTick(() => [])(present);

export const createEngine = (
  engineState: EngineState = engineDefaultState,
) => ({
  ...engineState,
  tick: () => createEngine(tick(engineState)),
  start: () =>
    createEngine(tick({ ...engineState, latestTick: 0, isRunning: true })),
  stop: () => createEngine({ ...engineState, isRunning: false }),
  addSystem: () => {},
  removeSystem: () => {},
});

export default createEngine;
