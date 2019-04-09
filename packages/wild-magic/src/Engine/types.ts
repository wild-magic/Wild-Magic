export interface EngineState {
  isRunning: boolean;
  systems: any[];
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
  addSystem: () => void;
  removeSystem: () => void;
}
