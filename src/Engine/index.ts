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

  static filterEntitiesByComponentTypes = filterEntitiesByComponentTypes;
  static getEntityByName = getEntityByName;
  public filterEntitiesByComponentTypes = filterEntitiesByComponentTypes;

  constructor(entityActions: EntityActions) {
    this.isRunning = false;
    this.latestTick = 0;
    this.systems = [];
    this.myEntities = entityActions.getEntities();
    this.entityActions = {
      ...entityActions,
      getEntities: () => this.myEntities,
    };
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
      const needsUpdatingEntityList: EntityState[] = Object.values(
        this.entities,
      ).filter(entity => entity.needsUpdating);

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

      // Flag them as not needing updating!
      // At least, we assume that everything has been handled this tick...
      needsUpdatingEntityList.forEach(entity => {
        this.entityActions.flagUpdatedEntity(entity.uuid);
      });
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
