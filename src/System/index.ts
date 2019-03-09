import {
  SystemConfig,
  SystemInitCallback,
  SystemUpdateCallback,
} from './types';
import { EntitiesState, EntityActions } from '../Engine/types';
import { EntityState } from '../Entity/types';

export default class System<T> {
  private data: T | null;
  public name: string;
  public componentTypes: string[];
  public handleUpdate: SystemConfig<T>['onUpdate'];
  private handleInit?: SystemConfig<T>['onInit'];
  private handleEntityAdded?: SystemConfig<T>['onEntityAdded'];

  constructor(systemConfig: SystemConfig<T>) {
    this.data = null;
    this.name = systemConfig.name;
    this.handleUpdate = systemConfig.onUpdate;
    this.handleInit = systemConfig.onInit;
    this.handleEntityAdded = systemConfig.onEntityAdded;
    this.componentTypes = systemConfig.componentTypes || [];
  }

  init(): void {
    if (this.handleInit) {
      this.data = this.handleInit();
    }
  }

  // attach entities and stuff
  addEntity(entity: any): void {
    if (this.handleEntityAdded) {
      this.handleEntityAdded(entity, this.data ? (this.data as T) : null);
    }
  }

  update(
    delta: number,
    entities: EntityState[],
    entityActions: EntityActions,
  ): void {
    this.handleUpdate(
      delta,
      entities,
      entityActions,
      this.data ? (this.data as T) : null,
    );
  }
}
