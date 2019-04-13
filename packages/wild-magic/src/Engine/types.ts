import { System } from '../System';
import { AnySystem } from '.';

export interface EngineState {
  isRunning: boolean;
  systems: AnySystem[];
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
  addSystem: (system: AnySystem) => Engine;
  removeSystem: (name: string) => Engine;
}
