import type { DomainEvent } from '../domain-event';

import { Entity } from './entity';

export abstract class AggregateRoot<ID> extends Entity<ID> {
  private events = new Set<DomainEvent<any>>();

  protected addEvent(event: DomainEvent<any>): void {
    this.events.add(event);
  }
  public clearEvent(): void {
    this.events.clear();
  }
  public getEvents(): Set<DomainEvent<any>> {
    return this.events;
  }
}
