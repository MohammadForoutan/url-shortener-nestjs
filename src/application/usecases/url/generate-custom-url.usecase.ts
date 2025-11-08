import { UrlRepository } from '@app/application/ports/url.repository';
import { UserRepository } from '@app/application/ports/user.repository';
import { Url } from '@app/domain/url/entities';
import { ShortLink } from '@app/domain/url/value-objects';
import { BadRequestException, Injectable } from '@nestjs/common';

interface GenerateCustomUrlCommand {
  originalUrl: string;
  customShortString: string;
  expirationDate: Date | null;
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
      visitsCount: 0,
      expirationDate: input.expirationDate ?? null,
      owner,
    });

    const createdUrl = await this.urlRepository.create(newUrl);
    return { url: createdUrl };
  }
}
