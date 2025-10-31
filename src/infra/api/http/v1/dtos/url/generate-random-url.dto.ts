import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GenerateRandomUrlDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The original url of the url',
    example: 'https://www.google.com',
  })
  originalUrl: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @ApiProperty({
    description: 'The expiration date of the url',
    example: '2025-10-25',
    nullable: true,
    type: Date,
  })
  expirationDate: Date | null = null;
}
