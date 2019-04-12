export interface SystemState {
  name: string;
}

export interface System extends SystemState {
  added: () => System;
  removed: () => null;
  update: () => System;
}

export const update = (systemState: SystemState) => {};

export const createSystem = (systemState: SystemState) => ({
  ...systemState,
  added: () => createSystem(systemState),
  removed: () => null,
  update: () => createSystem(systemState),
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
