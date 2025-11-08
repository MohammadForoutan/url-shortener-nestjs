import { AggregateRoot } from '@app/core/entities/aggregate';
import { generateId } from '@app/core/generate-id.util';

import type { User } from '../../user/entities';

import { OriginalLink } from '../value-objects/original-link.vo';
import { ShortLink } from '../value-objects/short-link.vo';

export class Url extends AggregateRoot<string> {
  public originalUrl: OriginalLink;
  public shortUrl: ShortLink;
  public isCustom: boolean;
  public visitsCount: number;
  public expirationDate: Date | null;
  public createdAt: Date;
  public updatedAt: Date;
  public owner: User;

  constructor(props: {
    id: string;
    originalUrl: OriginalLink;
    shortUrl: ShortLink;
    isCustom: boolean;
    visitsCount: number;
    expirationDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
  }) {
    super();
    this.id = props.id;
    this.originalUrl = props.originalUrl;
    this.shortUrl = props.shortUrl;
    this.isCustom = props.isCustom;
    this.visitsCount = props.visitsCount;
    this.expirationDate = props.expirationDate;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.owner = props.owner;
  }

  static create(props: {
    id?: string;
    originalUrl: string;
    shortUrl: ShortLink;
    isCustom: boolean;
    visitsCount: number | null;
    expirationDate: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    owner: User;
  }): Url {
    const id = generateId(props.id);
    // TODO: When we get input as VO or as string (Think)
    const originalUrl = OriginalLink.fromInput(props.originalUrl);
    const visitsCount = props.visitsCount ?? 0;

    return new Url({
      id,
      originalUrl,
      shortUrl: props.shortUrl,
      isCustom: props.isCustom,
      visitsCount,
      expirationDate: props.expirationDate,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      owner: props.owner,
    });
  }

  static extractShortUrl(url: string): string | null {
    return url.split('/').pop() ?? null;
  }

  incrementVisitsCount(): void {
    this.visitsCount++;
  }

  isExpired(): boolean {
    return this.expirationDate ? this.expirationDate < new Date() : false;
  }

  update(props: {
    originalUrl?: string;
    shortUrl?: string;
    expirationDate?: Date;
  }): void {
    if (props.originalUrl !== undefined) {
      this.originalUrl = OriginalLink.fromInput(props.originalUrl);
    }
    if (props.shortUrl !== undefined) {
      this.shortUrl = ShortLink.fromInput(props.shortUrl);
    }
    if (props.expirationDate !== undefined) {
      this.expirationDate = props.expirationDate;
    }
    this.updatedAt = new Date();
  }
}
