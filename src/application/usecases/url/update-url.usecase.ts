import { Url } from '@app/domain/url/entities';
// import { ShortLink } from '@app/domain/url/value-objects';
import { ShortLink } from '@app/domain/url/value-objects';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UrlRepository } from '../../ports/url.repository';

interface UpdateUrlCommand {
  id: string;
  ownerId: string;
  originalUrl?: string;
  shortUrl?: string;
  expirationDate?: Date;
}

interface UpdateUrlResponse {
  url: Url;
}

@Injectable()
export class UpdateUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(input: UpdateUrlCommand): Promise<UpdateUrlResponse> {
    const url = await this.urlRepository.findById(input.id);

    const isOwner = url?.owner.id === input.ownerId;
    if (!url || !isOwner) {
      throw new NotFoundException('Url not found');
    }

    // check if the short url is already taken
    if (input.shortUrl && input.shortUrl !== url.shortUrl.value) {
      const existingUrl = await this.urlRepository.findByShortUrl(
        ShortLink.fromInput(input.shortUrl).value,
      );
      if (existingUrl) {
        throw new BadRequestException('Short url already taken');
      }
    }

    url.update({
      originalUrl: input.originalUrl,
      shortUrl: input.shortUrl,
      expirationDate: input.expirationDate,
    });

    const updatedUrl = await this.urlRepository.update(url);
    return { url: updatedUrl };
  }
}
