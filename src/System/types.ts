import { EntitiesState, EntityActions } from '../Engine/types';
import { EntityState } from '../Entity/types';

export type SystemUpdateCallback<T> = (
  delta: number,
  entities: EntityState[],
  entityActions: EntityActions,
  initializableItem: T | null,
) => void;

export type SystemInitCallback<T> = (
  entities: EntityState[],
  entityActions: EntityActions,
) => T;

export interface SystemConfig<T> {
  name: string;
  onUpdate: SystemUpdateCallback<T>;
  onInit?: SystemInitCallback<T>;
  onEntityAdded?: (entity: any, data: any) => void;
  componentTypes?: string[];
}
