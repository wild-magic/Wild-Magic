import { System } from '..';
import { present } from '../utils';
import { EntityActions, EntitiesState } from './types';
import { EntityState } from '../Entity/types';

export default class Engine {
  private isRunning: boolean;
  private latestTick: number;
  private systems: System<any>[];
  private entityActions: EntityActions;
  private myEntities: EntitiesState;

  constructor(entityActions: EntityActions) {
    this.isRunning = false;
    this.latestTick = 0;
    this.systems = [];
    this.entityActions = entityActions;
    // Setup Entitites
    this.myEntities = this.entityActions.getEntities();
  }
  get entities() {
    return this.myEntities;
  }
  // Must be updated if any entities are changed@
  set entities(entities: EntitiesState) {
    this.myEntities = entities;
  }
  get entitiesList() {
    return Object.values(this.entities);
  }
  filterEntitiesByComponentTypes(entities: EntityState[], types: string[]) {
    return entities.filter(
      entity =>
        (entity.components || []).filter((component: any) => {
          return types.includes(component.name);
        }).length,
    );
  }
  filterEntitiesByComponentTypesIndexed(types: string[]): EntitiesState {
    return this.filterEntitiesByComponentTypes(
      Object.values(this.entities),
      types,
    ).reduce((memo: EntitiesState, entity: EntityState) => {
      return (memo[entity.uuid] = entity);
    }, {});
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
