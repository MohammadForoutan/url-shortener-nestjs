import { isValidHttpUrl } from '@app/infra';
import { BadRequestException } from '@nestjs/common';

import { ValueObject } from '../../../core/entities/value-object';

export class OriginalLink extends ValueObject<string> {
  static maxLength: number = 2048;
  static fromInput(value: string): OriginalLink {
    if (!isValidHttpUrl(value)) {
      throw new BadRequestException('Url is not valid http url');
    } else if (value.length > OriginalLink.maxLength) {
      throw new BadRequestException('Original url is too long');
    }
    return new OriginalLink(value);
  }

  static fromValid(value: string): OriginalLink {
    return new OriginalLink(value);
  }
}
