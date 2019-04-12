import { System } from '../System';

export interface EngineState {
  isRunning: boolean;
  systems: System[];
  components: any[];
  latestTick: number;
}

export type EngineFunction = () => Engine;

export type EngineFunctor = (
  engineState: Engine | EngineState,
) => Engine | EngineState;

export interface Engine extends EngineState {
  tick: EngineFunction;
  start: EngineFunction;
  stop: EngineFunction;
  addSystem: (system: System) => Engine;
  removeSystem: (name: string) => Engine;
}
