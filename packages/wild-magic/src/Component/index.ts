import uuid = require('uuid');

export type uuid = string;

export interface Component<D> {
  id: uuid;
  type: string;
  data: D;
}

export interface ComponentProps<D> {
  type: string;
  data: D;
}

export type AnyComponentProps = ComponentProps<any>;

export type AnyComponent = Component<any>;

export const createComponentType = (type: string) => (defaultProps: any) => (
  props?: any,
) =>
  createComponent({
    type,
    data: { ...defaultProps, props },
  });

export const registerComponent = (
  registrationAction: (component: AnyComponent) => void,
) => (component: AnyComponent) => registrationAction(component);

export const createComponent = ({
  type,
  data,
}: AnyComponentProps): AnyComponent => ({
  data,
  type,
  id: uuid(),
});
