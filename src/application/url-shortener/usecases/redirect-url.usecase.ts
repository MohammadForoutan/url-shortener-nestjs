import { Url } from '@app/domain/url-shortener/url';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UrlRepository } from '../ports/url.repository';

interface RedirectUrlCommand {
  shortUrl: string;
}

interface RedirectUrlResponse {
  url: Url;
}

@Injectable()
export class RedirectUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(input: RedirectUrlCommand): Promise<RedirectUrlResponse> {
    const url = await this.urlRepository.findByShortUrl(input.shortUrl);
    if (!url) {
      throw new NotFoundException('Url not found');
    }

    if (url.isExpired()) {
      throw new BadRequestException('Url expired');
    }

    url.incrementClickCount();

    // don't await this, it will block the request
    void this.urlRepository.update(url);
    return { url };
  }
}
