import { AnyComponent, uuid } from '../Component';
import { Observable } from 'rxjs';

export interface ComponentStateProps {
  componentIndex: ComponentIndex;
  addComponent: (component: AnyComponent) => void;
  updateComponent: (component: AnyComponent) => void;
  removeComponent: (uuid: uuid) => void;
  // getComponentById: (uuid: uuid) => AnyComponent | null;
}

export interface ComponentIndex {
  all: {
    [uuid: string]: AnyComponent;
  };
  [type: string]: {
    [uuid: string]: AnyComponent;
  };
}

export const defaultComponentStateProps: ComponentStateProps = {
  componentIndex: {
    all: {},
  },
  addComponent: (component: AnyComponent) => {},
  updateComponent: (component: AnyComponent) => {},
  removeComponent: (uuid: uuid) => {},
  // getComponentById: (uuid: uuid) => null,
};

export interface SystemComponentStateProps {
  components: {
    [uuid: string]: AnyComponent;
  };
  addComponent: (component: AnyComponent) => void;
  updateComponent: (component: AnyComponent) => void;
  removeComponent: (uuid: uuid) => void;
  getComponentById: (uuid: uuid) => AnyComponent | null;
}

export type AnyObject = { [key: string]: any };

export const filterObjectByKeys = (objectToFilter: AnyObject) => (
  keysToFilter: string[],
) =>
  Object.keys(objectToFilter).reduce(
    (obj: AnyObject, key: string) =>
      keysToFilter.includes(key) ? { ...obj, [key]: objectToFilter[key] } : obj,
    {},
  );

export const filterComponentStatePropsByComponentTypes = (types: string[]) => (
  components: ComponentStateProps,
): SystemComponentStateProps => ({
  ...components,
  getComponentById: (uuid: string) => components.componentIndex.all[uuid],
  components: types ? filterObjectByKeys(components.componentIndex)(types) : {},
});
