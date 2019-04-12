import { compose, present, pipe } from '../utils';
import { EngineState, Engine, EngineFunctor } from './types';
import { System } from '../System';

export interface OptionalEngineStateParams {
  isRunning?: boolean;
  systems?: System[];
  components?: any[];
  latestTick?: number;
}

export const applyEngineDefaults = (
  optionalEngineStateParams: OptionalEngineStateParams,
) => ({
  ...defaultEngineState,
  ...optionalEngineStateParams,
});

export const defaultEngineState: EngineState = {
  isRunning: false,
  systems: [],
  components: [],
  latestTick: 0,
};

export const updateSystems = (engineState: EngineState) => ({
  ...engineState,
  systems: engineState.systems.map(system => system.update()),
});

export const countLatestTick = (present: () => number) => (
  engineState: EngineState,
) => ({
  ...engineState,
  latestTick: present() - engineState.latestTick,
});

export const tick = (updateSystems: EngineFunctor) => (
  countLatestTick: EngineFunctor,
) => (engineState: EngineState) =>
  engineState.isRunning
    ? pipe(
        updateSystems,
        countLatestTick,
      )(engineState)
    : engineState;

export const createEngineWithOptions = (options: OptionalEngineStateParams) =>
  createEngine(applyEngineDefaults(options));

export const createEngine = (
  engineState: EngineState = defaultEngineState,
): Engine => ({
  ...engineState,
  tick: () =>
    pipe(
      tick(updateSystems)(countLatestTick(present)),
      createEngine,
    )(engineState),
  start: () =>
    pipe(
      tick(updateSystems)(countLatestTick(present)),
      createEngine,
    )({ ...engineState, latestTick: 0, isRunning: true }),
  stop: () => createEngine({ ...engineState, isRunning: false }),
  addSystem: (system: System) =>
    createEngine({
      ...engineState,
      systems: [...engineState.systems, system.added()],
    }),
  removeSystem: (name: string) =>
    createEngine({
      ...engineState,
      systems: engineState.systems
        .map(system => (system.name === name ? system.removed() : system))
        .filter(Boolean) as System[],
    }),
});

export default createEngineWithOptions;
