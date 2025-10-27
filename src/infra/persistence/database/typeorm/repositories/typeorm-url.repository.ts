import { Pagination } from '@app/application/common';
import { UrlRepository } from '@app/application/ports/url.repository';
import { Url } from '@app/domain/url/entities';
import { Injectable } from '@nestjs/common';

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

  findByShortUrl(shortUrl: string): Promise<Url | null> {
    return this.unitOfWork.doTransactional(async manager => {
      const urlEntity = await manager.findOne(UrlEntity, {
        where: { shortUrl },
        relations: { owner: true },
      });

      return urlEntity ? TypeormUrlMapper.toDomain(urlEntity) : null;
    });
  }

  update(url: Url): Promise<Url> {
    return this.unitOfWork.doTransactional(async manager => {
      await manager.update(UrlEntity, url.id, TypeormUrlMapper.toTypeorm(url));
      const urlEntity = (await manager.findOne(UrlEntity, {
        where: { id: url.id },
        relations: { owner: true },
      })) as UrlEntity;
      return TypeormUrlMapper.toDomain(urlEntity);
    });
  }

  findAllByOwnerId(
    ownerId: string,
    pagination: Pagination<void>,
  ): Promise<Pagination<Url>> {
    return this.unitOfWork.doTransactional(async manager => {
      const urlsAndCount = await manager.findAndCount(UrlEntity, {
        where: { owner: { id: ownerId } },
        take: pagination.take,
        skip: pagination.skip,
        relations: { owner: true },
      });

      const [urls, totalCount] = urlsAndCount;

      return Pagination.of(
        urls.map(url => TypeormUrlMapper.toDomain(url)),
        pagination.page,
        pagination.take,
        totalCount,
      );
    });
  }

  findById(id: string): Promise<Url | null> {
    return this.unitOfWork.doTransactional(async manager => {
      const urlEntity = await manager.findOne(UrlEntity, {
        where: { id },
        relations: { owner: true },
      });
      return urlEntity ? TypeormUrlMapper.toDomain(urlEntity) : null;
    });
  }
}
