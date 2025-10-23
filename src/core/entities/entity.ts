export abstract class Entity<ID> {
  public id: ID;

  public equals(entity: Entity<ID>): boolean {
    if (this === entity) {
      return true;
    }
    if (entity instanceof Entity && this.id === entity.id) {
      return true;
    }
    return false;
  }
}
