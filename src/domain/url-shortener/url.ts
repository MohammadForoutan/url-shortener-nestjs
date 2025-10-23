import { AggregateRoot } from '@app/core/entities/aggregate';
import { generateId } from '@app/core/generate-id.util';

import type { User } from './user';
import type { ShortLink } from './value-objects/short-link.vo';

import { OriginalLink } from './value-objects/original-link.vo';

export class Url extends AggregateRoot<string> {
  public originalUrl: OriginalLink;
  public shortUrl: ShortLink;
  public isCustom: boolean;
  public clickCount: number;
  public createdAt: Date;
  public updatedAt: Date;
  public owner: User;

  constructor(props: {
    id: string;
    originalUrl: OriginalLink;
    shortUrl: ShortLink;
    isCustom: boolean;
    clickCount: number;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
  }) {
    super();
    this.id = props.id;
    this.originalUrl = props.originalUrl;
    this.shortUrl = props.shortUrl;
    this.isCustom = props.isCustom;
    this.clickCount = props.clickCount;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.owner = props.owner;
  }

  static create(props: {
    id?: string;
    originalUrl: string;
    shortUrl: ShortLink;
    isCustom: boolean;
    clickCount: number | null;
    createdAt?: Date;
    updatedAt?: Date;
    owner: User;
  }): Url {
    const id = generateId(props.id);
    const originalUrl = OriginalLink.fromInput(props.originalUrl);
    const clickCount = props.clickCount ?? 0;

    return new Url({
      id,
      originalUrl,
      shortUrl: props.shortUrl,
      isCustom: props.isCustom,
      clickCount,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      owner: props.owner,
    });
  }

  static extractShortUrl(url: string): string | null {
    return url.split('/').pop() ?? null;
  }

  incrementClickCount(): void {
    this.clickCount++;
  }
}
