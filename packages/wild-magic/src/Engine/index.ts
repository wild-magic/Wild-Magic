import { compose, present, pipe } from '../utils';
import { EngineState, Engine, EngineFunctor } from './types';

export const defaultEngineState: EngineState = {
  isRunning: false,
  systems: [],
  components: [],
  latestTick: 0,
};

export type System = any;

export const processSystem = (system: System): System => ({
  processed: 'processed!',
});

type processSystem = (system: System) => System;
export const processSystems = (systems: System[]) => systems.map(processSystem);

type ProcessSystems = (systems: System[]) => System[];
export const updateSystems = (processSystems: ProcessSystems) => (
  engineState: EngineState,
) => ({
  ...engineState,
  systems: processSystems(engineState.systems),
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

export const createEngine = (
  engineState: EngineState = defaultEngineState,
): Engine => ({
  ...engineState,
  tick: () =>
    pipe(
      tick(updateSystems(processSystems))(countLatestTick(present)),
      createEngine,
    )(engineState),
  start: () =>
    pipe(
      tick(updateSystems(processSystems))(countLatestTick(present)),
      createEngine,
    )({ ...engineState, latestTick: 0, isRunning: true }),
  stop: () => createEngine({ ...engineState, isRunning: false }),
  addSystem: () => {},
  removeSystem: () => {},
});

export default createEngine;
