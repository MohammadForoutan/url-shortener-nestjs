import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class GenerateCustomUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'The original url of the url',
    example: 'https://www.google.com',
  })
  originalUrl: string;

  @IsString()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The custom short string of the url',
    example: 'my-custom-url',
  })
  customShortString: string;
}
