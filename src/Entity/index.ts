import { v4 } from 'uuid';
import { Component } from '..';
import { EntityConfig } from './types';

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
  private name?: string;
  private components: Component<any>[];
  public createdAt: number;
  public updatedAt?: number;
  constructor(entityConfig?: EntityConfig) {
    this.uuid = v4();
    this.createdAt = Date.now();
    if (entityConfig && entityConfig.name) {
      this.name = entityConfig.name;
    }
    this.components = entityConfig ? entityConfig.components : [];
  }
}
