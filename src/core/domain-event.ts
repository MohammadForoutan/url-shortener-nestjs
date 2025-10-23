export abstract class DomainEvent<ID> {
  public id: ID;
  public occurredAt: Date;

  constructor(props: Record<string, any>) {
    this.id = props.id as ID;
    this.occurredAt = props.occurredAt as Date;
  }
}
