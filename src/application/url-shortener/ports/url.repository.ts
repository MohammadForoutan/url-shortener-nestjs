import type { Pagination } from '@app/application/common';
import type { Url } from '@app/domain/url-shortener/url';
// import type { PaginatedList } from '@app/infra/interfaces';

export abstract class UrlRepository {
  abstract create: (url: Url) => Promise<Url>;
  abstract findById: (id: string) => Promise<Url | null>;
  abstract findByShortUrl: (shortUrl: string) => Promise<Url | null>;
  abstract findAllByOwnerId: (
    ownerId: string,
    pagination: Pagination<void>,
  ) => Promise<Pagination<Url>>;
  abstract update: (url: Url) => Promise<Url>;
}
