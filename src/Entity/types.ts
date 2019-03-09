import { Component } from '..';

export interface EntityConfig {
  name?: string;
  components: Component<any>[];
}

export type EntityState = {
  uuid: string;
  name?: string;
  createdAt: number;
  updatedAt: number;
  [componentKey: string]: any;
};
