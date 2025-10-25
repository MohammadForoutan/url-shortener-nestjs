import { Url } from '@app/domain/url-shortener/url';
import {
  OriginalLink,
  ShortLink,
} from '@app/domain/url-shortener/value-objects';

import type { UrlEntity } from '../entities/url.entity';

import { TypeormUserMapper } from './typeorm-user.mapper';

export class TypeormUrlMapper {
  static toDomain(urlEntity: UrlEntity): Url {
    return new Url({
      id: urlEntity.id,
      originalUrl: OriginalLink.fromValid(urlEntity.originalUrl),
      shortUrl: ShortLink.fromValid(urlEntity.shortUrl),
      isCustom: urlEntity.isCustom,
      clickCount: urlEntity.clickCount,
      expirationDate: urlEntity.expirationDate,
      createdAt: urlEntity.createdAt,
      updatedAt: urlEntity.updatedAt,
      owner: TypeormUserMapper.toDomain(urlEntity.owner),
    });
  }
  static toTypeorm(url: Url): UrlEntity {
    return {
      id: url.id,
      originalUrl: url.originalUrl.value,
      shortUrl: url.shortUrl.value,
      isCustom: url.isCustom,
      clickCount: url.clickCount,
      expirationDate: url.expirationDate,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      owner: TypeormUserMapper.toTypeorm(url.owner),
    };
  }
}
