import { System } from '..';
import { EntityState } from '../Entity/types';

export interface EngineConfig {}

export interface EntityActions {
  getEntities: () => EntitiesState;
  addEntity: (entity: any) => void;
  updateEntity: (
    entityUUID: string,
    componentName: string,
    componentData: any,
  ) => void;
  flagUpdatedEntity: (entityUUID: string) => void;
  removeEntity: (entity: any) => void;
}

export interface EntitiesState {
  [entityUUID: string]: EntityState;
}
