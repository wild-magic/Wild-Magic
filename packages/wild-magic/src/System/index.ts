import { pipe } from '../utils';
import {
  ComponentStateProps,
  SystemComponentStateProps,
  filterComponentStatePropsByComponentTypes,
} from '../State';

export interface SystemState<D> {
  name: string;
  componentTypes?: string[];
  onAdd?: (systemComponents: SystemComponentStateProps) => D;
  onUpdate?: (systemComponents: SystemComponentStateProps, data: D) => D;
  onRemove?: (systemComponents: SystemComponentStateProps, data: D) => D;
  data?: D;
}

export interface System<D> extends SystemState<D> {
  add: (components: ComponentStateProps) => System<D>;
  remove: (components: ComponentStateProps) => null;
  update: (components: ComponentStateProps) => System<D>;
  data: D;
}

export type AnySystemState = SystemState<any>;

export type SystemFunction<D> = (systemState: SystemState<D>) => System<D>;

export const safeCallRemove = (systemComponents: SystemComponentStateProps) => (
  systemState: AnySystemState,
) =>
  systemState.onRemove &&
  systemState.onRemove(systemComponents, systemState.data || {});

export const createSystem = (systemState: AnySystemState) => ({
  ...systemState,
  data: systemState.data || {},
  add: (components: ComponentStateProps) =>
    createSystem({
      ...systemState,
      data:
        systemState.onAdd &&
        systemState.onAdd(
          filterComponentStatePropsByComponentTypes(
            systemState.componentTypes || [],
          )(components),
        ),
    }),
  remove: (components: ComponentStateProps) =>
    pipe(
      safeCallRemove(
        filterComponentStatePropsByComponentTypes(
          systemState.componentTypes || [],
        )(components),
      ),
      () => createSystem(systemState),
    )(systemState),
  update: (components: ComponentStateProps) =>
    createSystem({
      ...systemState,
      data: systemState.onUpdate
        ? systemState.onUpdate(
            filterComponentStatePropsByComponentTypes(
              systemState.componentTypes || [],
            )(components),
            systemState.data || {},
          )
        : systemState.data,
    }),
});
