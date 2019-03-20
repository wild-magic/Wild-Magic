import { EntityState } from '../Entity/types';
import { EntitiesState } from './types';

export const filterEntitiesByComponentTypes = (
  entities: EntityState[],
  types: string[],
) => {
  return entities.filter(
    entity =>
      (entity.components || []).filter((component: any) => {
        return types.includes(component.name);
      }).length,
  );
};
export const filterEntitiesByComponentTypesIndexed = (
  entities: EntitiesState,
  types: string[],
): EntitiesState => {
  return filterEntitiesByComponentTypes(Object.values(entities), types).reduce(
    (memo: EntitiesState, entity: EntityState) => {
      return (memo[entity.uuid] = entity);
    },
    {},
  );
};

export const getEntityByName = (
  entities: EntitiesState,
  name: string,
): EntityState | null => {
  return Object.values(entities).find(entity => entity.name === name) || null;
};
