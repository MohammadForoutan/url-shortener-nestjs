import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUrlDto {
  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'The original url of the url',
    example: 'https://www.google.com',
  })
  originalUrl?: string;

  @IsString()
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The custom short string of the url',
    example: 'my-custom-url',
  })
  customShortString?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @ApiProperty({
    description: 'The expiration date of the url',
    example: '2025-10-25',
    nullable: true,
    type: Date,
  })
  expirationDate?: Date;
}
