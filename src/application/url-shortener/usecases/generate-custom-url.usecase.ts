import { Url } from '@app/domain/url-shortener/url';
import { ShortLink } from '@app/domain/url-shortener/value-objects';
import { BadRequestException, Injectable } from '@nestjs/common';

import { UrlRepository } from '../ports/url.repository';
import { UserRepository } from '../ports/user.repository';

interface GenerateCustomUrlCommand {
  originalUrl: string;
  customShortString: string;
  ownerId: string;
}

interface GenerateCustomUrlResponse {
  url: Url;
}

@Injectable()
export class GenerateCustomUrlUseCase {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(
    input: GenerateCustomUrlCommand,
  ): Promise<GenerateCustomUrlResponse> {
    const shortUrl = ShortLink.fromInput(input.customShortString);
    if (!shortUrl) {
      throw new BadRequestException('Custom short url is not valid');
    }

    const isShortUrlAlreadyExists = await this.urlRepository.findByShortUrl(
      shortUrl.value,
    );
    if (isShortUrlAlreadyExists) {
      throw new BadRequestException('Short url already exists');
    }

    const owner = await this.userRepository.findById(input.ownerId);
    if (!owner) {
      throw new BadRequestException('User not found');
    }

    const newUrl = Url.create({
      originalUrl: input.originalUrl,
      shortUrl,
      isCustom: true,
      clickCount: 0,
      owner,
    });

    const createdUrl = await this.urlRepository.create(newUrl);
    return { url: createdUrl };
  }
}
