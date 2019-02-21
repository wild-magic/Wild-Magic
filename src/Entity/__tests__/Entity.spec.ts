import Entity from '../';

describe('Entity', () => {
  it('should create an entity with a UUID', () => {
    const entity = new Entity();
    expect(entity).toHaveProperty('uuid');
  });

  it('should init with an empty list of components', () => {
    const entity = new Entity();
    expect(entity).toHaveProperty('components', []);
  });
});
