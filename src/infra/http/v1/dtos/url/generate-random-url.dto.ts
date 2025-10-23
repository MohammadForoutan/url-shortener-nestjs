import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateRandomUrlDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The original url of the url',
    example: 'https://www.google.com',
  })
  originalUrl: string;
}
