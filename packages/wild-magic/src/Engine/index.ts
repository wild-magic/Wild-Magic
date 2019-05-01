import { compose, present, pipe } from '../utils';
import { EngineState, Engine, EngineFunctor } from './types';
import { System } from '../System';
import {
  ComponentStateProps,
  defaultComponentStateProps,
  ComponentIndex,
} from '../State';
import { AnyComponent } from '../Component';

export interface OptionalEngineStateParams {
  isRunning?: boolean;
  systems?: AnySystem[];
  components?: ComponentStateProps;
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
  components: defaultComponentStateProps,
  latestTick: 0,
};

export const updateSystems = (engineState: EngineState) => ({
  ...engineState,
  systems: engineState.systems.map(system =>
    system.update(engineState.latestTick, engineState.components),
  ),
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

export type AnySystem = System<any>;

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
  addSystem: (system: AnySystem) =>
    createEngine({
      ...engineState,
      systems: [...engineState.systems, system.add(engineState.components)],
    }),
  removeSystem: (name: string) =>
    createEngine({
      ...engineState,
      systems: engineState.systems
        .map(system =>
          system.name === name ? system.remove(engineState.components) : system,
        )
        .filter(Boolean) as AnySystem[],
    }),
  addComponent: (component: AnyComponent) =>
    createEngine({
      ...engineState,
      systems: engineState.systems.map(system =>
        system.componentTypes && system.componentTypes.includes(component.type)
          ? system.addComponent(component)(engineState.components)
          : system,
      ),
    }),
  updateComponentIndex: (componentIndex: ComponentIndex) =>
    createEngine({
      ...engineState,
      components: {
        ...engineState.components,
        componentIndex,
      },
    }),
  removeComponent: (component: AnyComponent) =>
    createEngine({
      ...engineState,
      systems: engineState.systems.map(system =>
        system.componentTypes && system.componentTypes.includes(component.type)
          ? system.addComponent(component)(engineState.components)
          : system,
      ),
    }),
});

export default createEngineWithOptions;
