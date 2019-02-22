import { v4 } from 'uuid';
import { Component } from '..';

/**
 *
 * An entity is nothing more than a Bag of Holding (Components)
 * Think of it as a wrapper for components concerning a distinct
 * game entity
 *
 * @export
 * @class Entity
 */
export default class Entity {
  readonly uuid: string;
  public components: Component[];
  constructor() {
    this.uuid = v4();
    this.components = [];
  }
}
