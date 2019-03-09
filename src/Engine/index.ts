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
  filterEntitiesByComponentTypes(types: string[]) {
    return Object.values(this.entities).filter(
      entity =>
        entity.components.filter((component: any) =>
          types.includes(component.name),
        ).length,
    );
  }
  filterEntitiesByComponentTypesIndexed(types: string[]): EntitiesState {
    return this.filterEntitiesByComponentTypes(types).reduce(
      (memo: EntitiesState, entity: EntityState) => {
        return (memo[entity.uuid] = entity);
      },
      {},
    );
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
      this.systems.forEach(system =>
        system.update(
          this.latestTick,
          this.filterEntitiesByComponentTypes(system.componentTypes),
          this.entityActions,
        ),
      );
    }
    return this;
  }
  addSystem(system: System<any>): Engine {
    this.systems.push(system);
    system.init();
    // prime the system by adding entities
    this.filterEntitiesByComponentTypes(system.componentTypes).forEach(
      (entity: any) => system.addEntity(entity),
    );
    return this;
  }
}
