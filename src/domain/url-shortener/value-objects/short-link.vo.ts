import { BadRequestException } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { ValueObject } from '../../../core/entities/value-object';

export class ShortLink extends ValueObject<string> {
  static randomUrlLength: number = 8;
  static maxCustomLength: number = 255;

  static fromInput(customShortLink?: string): ShortLink {
    let shortLink: string;
    const isCustomShortLink = customShortLink && customShortLink.length > 0;

    // validation for custom short link length
    if (
      isCustomShortLink &&
      customShortLink.length > ShortLink.maxCustomLength
    ) {
      throw new BadRequestException('Custom short kubj is too long');
    }

    // if custom short link is provided, slugify it
    if (isCustomShortLink) {
      shortLink = ShortLink.slugify(customShortLink);
    } else {
      shortLink = nanoid(ShortLink.randomUrlLength);
    }

    return new ShortLink(shortLink);
  }

  static fromValid(value: string): ShortLink {
    return new ShortLink(value);
  }

  static slugify(customShortString: string): string {
    return customShortString.toLowerCase().replace(/ /g, '-');
  }
}
