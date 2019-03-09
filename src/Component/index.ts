/**
 *
 *
 * @export
 * @template Data
 * @param {string} name
 * @param {Data} defaultData
 * @returns {ComponentFunction<Data>}
 */
export function createComponent<Data>(
  name: string,
  defaultData: Data,
): ComponentFunction<Data> {
  const componentOutput: ComponentOutput<Data> = {
    name,
    data: defaultData,
  };
  return (dataOverride: any): ComponentOutput<Data> => {
    return new Component(
      name,
      Object.assign(componentOutput.data, dataOverride),
    );
  };
}

/**
 * Base component class
 * You can see it's pretty simple. It's just an identifier (name)
 * as well as a container with typed Data
 *
 * @export
 * @class Component
 * @template Data
 */
export default class Component<Data> {
  readonly name: string;
  public data: Data;
  constructor(name: string, defaultData: Data) {
    this.name = name;
    this.data = defaultData;
  }
}
