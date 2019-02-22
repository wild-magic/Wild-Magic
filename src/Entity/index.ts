import { v4 } from 'uuid';
import { Component } from '..';

export default class Entity {
  readonly uuid: string;
  public components: Component[];
  constructor() {
    this.uuid = v4();
    this.components = [];
  }
}
