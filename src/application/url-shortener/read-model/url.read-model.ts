import type { Url } from '@app/domain/url-shortener/url';

import { envConfig } from '@app/infra';
import { ApiProperty } from '@nestjs/swagger';

export class UrlReadModel {
  @ApiProperty({
    description: 'The id of the url',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
  @ApiProperty({
    description: 'The original url of the url',
    example: 'https://www.google.com',
  })
  originalUrl: string;

  @ApiProperty({
    description: 'The click count of the url',
    example: 23,
  })
  clickCount: number;

  @ApiProperty({
    description: 'The short url of the url',
    example: 'https://www.google.com/123e4567-e89b-12d3-a456-426614174000',
  })
  shortUrl: string;
  @ApiProperty({
    description: 'The created at of the url',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'The updated at of the url',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  constructor(url: Url) {
    this.id = url.id;
    this.originalUrl = url.originalUrl.value;
    this.clickCount = url.clickCount;
    this.shortUrl = `${envConfig.APP_URL}${url.shortUrl.value}`;
    this.createdAt = url.createdAt;
    this.updatedAt = url.updatedAt;
  }
}
