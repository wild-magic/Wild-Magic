import { System } from '..';
import { present } from '../utils';
import { EntityActions, EntitiesState } from './types';
import { EntityState } from '../Entity/types';
import {
  filterEntitiesByComponentTypesIndexed,
  filterEntitiesByComponentTypes,
  getEntityByName,
} from './utils';

export default class Engine {
  private isRunning: boolean;
  private latestTick: number;
  private systems: System<any>[];
  private entityActions: EntityActions;
  private myEntities: EntitiesState;

  private needsUpdatingEntityUUIDList: string[] = [];

  static filterEntitiesByComponentTypes = filterEntitiesByComponentTypes;
  static getEntityByName = getEntityByName;
  public filterEntitiesByComponentTypes = filterEntitiesByComponentTypes;

  constructor(entityActions: EntityActions) {
    console.log('Hello Wild Magic');
    this.isRunning = false;
    this.latestTick = 0;
    this.systems = [];
    this.myEntities = entityActions.getEntities();
    this.entityActions = {
      ...entityActions,
      getEntities: () => this.myEntities,
      updateEntity: (
        entityUUID: string,
        componentName: string,
        componentData: any,
      ) => {
        this.flagUpdatedEntity(entityUUID);
        return entityActions.updateEntity(
          entityUUID,
          componentName,
          componentData,
        );
      },
      addEntity: (entity: any) => {
        this.flagUpdatedEntity(entity.uuid);
        return entityActions.addEntity(entity);
      },
    };
  }

  flagUpdatedEntity(entityUUID: string) {
    if (this.needsUpdatingEntityUUIDList.indexOf(entityUUID) < 0) {
      this.needsUpdatingEntityUUIDList.push(entityUUID);
    }
  }

  get entities() {
    return this.myEntities;
  }
  // Must be updated if any entities are changed
  set entities(entities: EntitiesState) {
    this.myEntities = entities;
  }
  get entitiesList() {
    return Object.values(this.entities);
  }

  filterEntitiesByComponentTypesIndexed(types: string[]): EntitiesState {
    return filterEntitiesByComponentTypesIndexed(this.entities, types);
  }
  start(): Engine {
    this.isRunning = true;
    this.latestTick = present();
    this.tick();
    return this;
  }
  stop(): Engine {
    this.isRunning = false;
    return this;
  }
  tick(): Engine {
    this.latestTick = present() - this.latestTick;
    if (this.isRunning) {
      // get only the entities that are flagged as needing to be updated
      const needsUpdatingEntityList: EntityState[] = Object.values(
        this.entities,
      ).filter(
        entity => this.needsUpdatingEntityUUIDList.indexOf(entity.uuid) >= 0,
      );

      // Loop through and update with each system
      this.systems.forEach(system =>
        system.update(
          this.latestTick,
          this.filterEntitiesByComponentTypes(
            needsUpdatingEntityList,
            system.componentTypes,
          ),
          this.entityActions,
        ),
      );

      // Remove entities from needsUpdating list
      const needsUpdatingEntityUUIDList = needsUpdatingEntityList.map(
        entity => entity.uuid,
      );
      this.needsUpdatingEntityUUIDList = this.needsUpdatingEntityUUIDList.filter(
        entityUUID => {
          return needsUpdatingEntityUUIDList.indexOf(entityUUID) < 0;
        },
      );
    }
    return this;
  }
  addSystem(system: System<any>): Engine {
    this.systems.push(system);
    system.init(
      this.filterEntitiesByComponentTypes(
        Object.values(this.entities),
        system.componentTypes,
      ),
      this.entityActions,
    );
    return this;
  }
}
