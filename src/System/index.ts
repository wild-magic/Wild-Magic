import {
  SystemConfig,
  SystemInitCallback,
  SystemUpdateCallback,
} from './types';
import { EntitiesState, EntityActions } from '../Engine/types';
import { EntityState } from '../Entity/types';
import { diffArray } from '../utils';

export default class System<T> {
  private data: T | null;
  public name: string;
  public componentTypes: string[];
  public handleUpdate: SystemConfig<T>['onUpdate'];
  private handleInit?: SystemConfig<T>['onInit'];
  private handleEntityAdded?: SystemConfig<T>['onEntityAdded'];
  private entityUUIDlist: string[] = [];

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
      this.entityUUIDlist.push(entity.uuid);
      this.handleEntityAdded(entity, this.data ? (this.data as T) : null);
    }
  }

  update(
    delta: number,
    entities: EntityState[],
    entityActions: EntityActions,
  ): void {
    // add new enitties to system which were added after init
    const diff = diffArray(
      this.entityUUIDlist,
      entities.map(entity => entity.uuid),
    );

    diff.forEach(entityUUID => {
      this.addEntity(entities.find(entity => entity.uuid === entityUUID));
    });

    // update all associated entities
    this.handleUpdate(
      delta,
      entities,
      entityActions,
      this.data ? (this.data as T) : null,
    );
  }
}
