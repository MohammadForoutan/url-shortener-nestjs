import type { Url } from '@app/domain/url-shortener/url';

export abstract class UrlRepository {
  abstract create: (url: Url) => Promise<Url>;
  abstract findByShortUrl: (shortUrl: string) => Promise<Url | null>;
  abstract update: (url: Url) => Promise<Url>;
}
