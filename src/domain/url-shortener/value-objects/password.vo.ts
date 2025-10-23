import { BadRequestException } from '@nestjs/common';

import { ValueObject } from '../../../core/entities/value-object';

export class Password extends ValueObject<string> {
  private static get minLength(): number {
    return 8;
  }

  static fromInput(value: string): Password {
    const isString = typeof value === 'string';
    const isLongEnough = value.length >= Password.minLength;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecial = /[\W_]/.test(value);

    if (
      !isString ||
      !isLongEnough ||
      !hasUpper ||
      !hasLower ||
      !hasDigit ||
      !hasSpecial
    ) {
      throw new BadRequestException('Password is not valid');
    }
    return new Password(value);
  }

  static fromValid(value: string): Password {
    return new Password(value);
  }
}
