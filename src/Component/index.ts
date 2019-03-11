import { ComponentFunction, ComponentOutput } from './types';

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
  return function(dataOverride: any): ComponentOutput<Data> {
    // @ts-ignore
    // Spread types may only be created from object types.
    // https://github.com/Microsoft/TypeScript/issues/26412
    const newStuff = { ...defaultData, ...dataOverride };
    return new Component(name, newStuff);
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
