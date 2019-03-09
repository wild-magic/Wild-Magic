export interface ComponentOutput<Data> {
  name: string;
  data: Data;
}

export type ComponentFunction<Data> = (
  dataOverride?: any,
) => ComponentOutput<Data>;
