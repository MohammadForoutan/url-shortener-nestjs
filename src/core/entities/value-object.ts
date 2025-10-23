import { shallowEqual } from 'shallow-equal-object';

export class ValueObject<T> {
  protected constructor(public readonly value: T) {
    this.value = Object.freeze(value);
  }

  public equals(valueObject: ValueObject<T>): boolean {
    return shallowEqual(this.value, valueObject.value);
  }
}
