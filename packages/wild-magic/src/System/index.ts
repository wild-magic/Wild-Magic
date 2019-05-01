import { pipe } from '../utils';
import {
  ComponentStateProps,
  SystemComponentStateProps,
  filterComponentStatePropsByComponentTypes,
} from '../State';
import { AnyComponent } from '../Component';

export interface SystemState<D> {
  name: string;
  componentTypes?: string[];
  onComponentAdded?: (
    systemComponents: SystemComponentStateProps,
    data: D,
    component: AnyComponent,
  ) => D;
  onComponentRemoved?: (
    systemComponents: SystemComponentStateProps,
    data: D,
    component: AnyComponent,
  ) => D;
  onAdd?: (systemComponents: SystemComponentStateProps) => D;
  onUpdate?: (
    delta: number,
    systemComponents: SystemComponentStateProps,
    data: D,
  ) => D;
  onRemove?: (systemComponents: SystemComponentStateProps, data: D) => D;
  data?: D;
}

export interface System<D> extends SystemState<D> {
  add: (components: ComponentStateProps) => System<D>;
  remove: (components: ComponentStateProps) => null;
  update: (delta: number, components: ComponentStateProps) => System<D>;
  addComponent: (
    component: AnyComponent,
  ) => (components: ComponentStateProps) => System<D>;
  removeCompoonent: (
    component: AnyComponent,
  ) => (components: ComponentStateProps) => System<D>;
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
  addComponent: (component: AnyComponent) => (
    components: ComponentStateProps,
  ) =>
    createSystem({
      ...systemState,
      data:
        systemState.onComponentAdded &&
        systemState.onComponentAdded(
          filterComponentStatePropsByComponentTypes(
            systemState.componentTypes || [],
          )(components),
          systemState.data || {},
          component,
        ),
    }),
  removeCompoonent: (component: AnyComponent) => (
    components: ComponentStateProps,
  ) =>
    createSystem({
      ...systemState,
      data:
        systemState.onComponentRemoved &&
        systemState.onComponentRemoved(
          filterComponentStatePropsByComponentTypes(
            systemState.componentTypes || [],
          )(components),
          systemState.data || {},
          component,
        ),
    }),
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
  update: (delta: number, components: ComponentStateProps) =>
    createSystem({
      ...systemState,
      data: systemState.onUpdate
        ? systemState.onUpdate(
            delta,
            filterComponentStatePropsByComponentTypes(
              systemState.componentTypes || [],
            )(components),
            systemState.data || {},
          )
        : systemState.data,
    }),
});
