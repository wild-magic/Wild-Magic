import { System } from '../System';
import { AnySystem } from '.';
import { ComponentStateProps } from '../State';

export interface EngineState {
  isRunning: boolean;
  systems: AnySystem[];
  latestTick: number;
  components: ComponentStateProps;
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
