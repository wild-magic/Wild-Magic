import uuid from 'uuid/v4';
import { Component } from '..';

export default class Entity {
  readonly uuid: string;
  public components: Component[];
  constructor() {
    this.uuid = uuid();
    this.components = [];
  }
}
