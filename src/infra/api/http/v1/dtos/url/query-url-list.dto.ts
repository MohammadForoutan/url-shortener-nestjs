import { ApiPaginationOptions } from '@app/infra/api';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class QueryUrlListDto implements ApiPaginationOptions {
  @ApiProperty({
    description: 'The page number',
    example: 1,
    default: 1,
    required: false,
  })
  @Transform(({ value }) => Number(value ?? 1))
  @IsNumber()
  @IsOptional()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
    required: false,
    default: 10,
  })
  @Transform(({ value }) => Number(value ?? 10))
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
