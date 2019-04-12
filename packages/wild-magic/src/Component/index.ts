export type uuid = string;

export interface Component<S> {
  id: uuid;
  isPartOf?: uuid;
  data: S;
}

export const createComponent = () => ({});
