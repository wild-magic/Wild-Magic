import { System } from '..';
import { EntityState } from '../Entity/types';

export interface EngineConfig {
  getEntities: () => EntitiesState;
  addEntity: (entity: any) => void;
  updateEntity: (
    entityUUID: string,
    componentName: string,
    componentData: any,
    patch?: boolean,
  ) => void;
  removeEntity: (entity: any) => void;
}

export interface EntityActions extends EngineConfig {
  getEntityByUUID: (entityUUID: string) => EntityState | null;
  getEntitiesByComponentName: (componentName: string) => EntityState[];
  getEntityByName: (entityName: string) => EntityState | null;
}

export interface EntitiesState {
  [entityUUID: string]: EntityState;
}
