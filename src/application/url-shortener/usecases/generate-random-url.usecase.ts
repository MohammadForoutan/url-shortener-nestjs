import { Url } from '@app/domain/url-shortener/url';
import { ShortLink } from '@app/domain/url-shortener/value-objects';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UrlRepository } from '../ports/url.repository';
import { UserRepository } from '../ports/user.repository';

interface GenerateRandomUrlCommand {
  originalUrl: string;
  ownerId: string;
  expirationDate: Date | null;
}

interface GenerateRandomUrlResponse {
  url: Url;
}

@Injectable()
export class GenerateRandomUrlUseCase {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: GenerateRandomUrlCommand,
  ): Promise<GenerateRandomUrlResponse> {
    const owner = await this.userRepository.findById(input.ownerId);
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const newUrl = Url.create({
      originalUrl: input.originalUrl,
      shortUrl: ShortLink.fromInput(),
      isCustom: false,
      clickCount: 0,
      expirationDate: input.expirationDate,
      owner,
    });
    const createdUrl = await this.urlRepository.create(newUrl);
    return { url: createdUrl };
  }
}
