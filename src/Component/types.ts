interface ComponentOutput<Data> {
  name: string;
  data: Data;
}

type ComponentFunction<Data> = (dataOverride?: any) => ComponentOutput<Data>;
