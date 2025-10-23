import { UrlRepository } from '@app/application/url-shortener/ports/url.repository';
import { Url } from '@app/domain/url-shortener/url';
import { Injectable } from '@nestjs/common';
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm';

import { UrlEntity } from '../entities/url.entity';
import { TypeormUrlMapper } from '../mapper/typeorm-url.mapper';
import { TypeormUnitOfWork } from '../unit-of-work';

@Injectable()
export class TypeormUrlRepository implements UrlRepository {
  constructor(private readonly unitOfWork: TypeormUnitOfWork) {}

  create(url: Url): Promise<Url> {
    return this.unitOfWork.doTransactional(async manager => {
      const urlEntity = manager.create(
        UrlEntity,
        TypeormUrlMapper.toTypeorm(url),
      );
      const savedUrlEntity = await manager.save(urlEntity);
      return TypeormUrlMapper.toDomain(savedUrlEntity);
    });
  }

  findByShortUrl(
    shortUrl: string,
    options?: {
      where?: { ownerId?: string; isCustom?: boolean };
    },
  ): Promise<Url | null> {
    return this.unitOfWork.doTransactional(async manager => {
      const relations: FindOptionsRelations<UrlEntity> = { owner: true };
      const where: FindOptionsWhere<UrlEntity> = { shortUrl };
      if (options?.where?.isCustom) where.isCustom = options.where.isCustom;
      if (options?.where?.ownerId) where.owner = { id: options.where.ownerId };

      const urlEntity = await manager.findOne(UrlEntity, {
        where,
        relations,
      });

      return urlEntity ? TypeormUrlMapper.toDomain(urlEntity) : null;
    });
  }

  update(url: Url): Promise<Url> {
    return this.unitOfWork.doTransactional(async manager => {
      const urlEntity = manager.create(
        UrlEntity,
        TypeormUrlMapper.toTypeorm(url),
      );
      const savedUrlEntity = await manager.save(urlEntity);
      return TypeormUrlMapper.toDomain(savedUrlEntity);
    });
  }
}
