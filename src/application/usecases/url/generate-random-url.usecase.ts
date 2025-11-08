import { UrlRepository, UserRepository } from '@app/application/ports';
import { Url } from '@app/domain/url/entities';
import { ShortLink } from '@app/domain/url/value-objects';
import { Injectable, NotFoundException } from '@nestjs/common';

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
      visitsCount: 0,
      expirationDate: input.expirationDate,
      owner,
    });
    const createdUrl = await this.urlRepository.create(newUrl);
    return { url: createdUrl };
  }
}
