import { AnyComponent, uuid } from '../Component';

export interface ComponentStateProps {
  componentIndex: ComponentIndex;
  addComponent: (component: AnyComponent) => void;
  updateComponent: (uuid: uuid) => void;
  removeComponent: (uuid: uuid) => void;
}

export interface ComponentIndex {
  [type: string]: {
    [uuid: string]: AnyComponent;
  };
}

export const defaultComponentStateProps: ComponentStateProps = {
  componentIndex: {},
  addComponent: (component: AnyComponent) => {},
  updateComponent: (uuid: uuid) => {},
  removeComponent: (uuid: uuid) => {},
};

export interface SystemComponentStateProps {
  components: {
    [uuid: string]: AnyComponent;
  };
  addComponent: (component: AnyComponent) => void;
  updateComponent: (uuid: uuid) => void;
  removeComponent: (uuid: uuid) => void;
}

export type AnyObject = { [key: string]: any };

export const filterObjectByKeys = (objectToFilter: AnyObject) => (
  keysToFilter: string[],
) =>
  objectToFilter.reduce(
    (obj: AnyObject, key: string) =>
      keysToFilter.includes(key) ? { ...obj, [key]: objectToFilter[key] } : obj,
    {},
  );

export const filterComponentStatePropsByComponentTypes = (types: string[]) => (
  components: ComponentStateProps,
): SystemComponentStateProps => ({
  ...components,
  components: types ? filterObjectByKeys(components.componentIndex)(types) : {},
});
