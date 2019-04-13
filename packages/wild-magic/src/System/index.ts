import { pipe } from '../utils';

export interface SystemState<D> {
  name: string;
  onAdd?: () => D;
  onUpdate?: (data: D) => D;
  onRemove?: (data: D) => D;
  data?: D;
}

export interface System<D> extends SystemState<D> {
  add: () => System<D>;
  remove: () => null;
  update: () => System<D>;
  data: D;
}

export type AnySystemState = SystemState<any>;

export type SystemFunction<D> = (systemState: SystemState<D>) => System<D>;

export const safeCallRemove = (systemState: AnySystemState) =>
  systemState.onRemove && systemState.onRemove(systemState.data || {});

export const createSystem = (systemState: AnySystemState) => ({
  ...systemState,
  data: systemState.data || {},
  add: () =>
    createSystem({
      ...systemState,
      data: systemState.onAdd && systemState.onAdd(),
    }),
  remove: () =>
    pipe(
      safeCallRemove,
      () => createSystem(systemState),
    )(systemState),
  update: () =>
    createSystem({
      ...systemState,
      data: systemState.onUpdate
        ? systemState.onUpdate(systemState.data || {})
        : systemState.data,
    }),
  // components: {
  //   watch: [],
  //   added: () => {},
  //   removed: () => {},
  // },
});

// const mySystem = createSystem((componentActions: any) => ({
//   watch: [],
//   data: () => {
//     return {};
//   },
//   added: () => {},
//   removed: () => {},
//   update: () => {},
//   components: {
//     added: () => {},
//     removed: () => {},
//   },
// }));
