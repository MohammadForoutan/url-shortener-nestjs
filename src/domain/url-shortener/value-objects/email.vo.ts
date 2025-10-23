import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

import { ValueObject } from '../../../core/entities/value-object';

export class Email extends ValueObject<string> {
  private static schema = z.email();

  static fromInput(value: string): Email {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      // throw new Exception(MSG.EMAIL_MOST_BE_VALID, 'BAD_REQUEST');
      throw new BadRequestException('Invalid email');
    }
    return new Email(value);
  }

  static fromValid(value: string): Email {
    return new Email(value);
  }
}
