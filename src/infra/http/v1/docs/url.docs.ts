import type { UrlReadModel } from '@app/application/url-shortener/read-model';

import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { generateDocSchema } from './utils';
import { mockReadModels } from './utils/mock-read-models';

export const GenerateRandomUrlDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Generate a random url',
      description: 'Generate a random url',
    }),
    ApiResponse({
      status: 201,
      description: 'Random url generated successfully',
      example: generateDocSchema<UrlReadModel>({ data: mockReadModels.url }),
    }),
  );

export const GenerateCustomUrlDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Generate a custom url',
      description: 'Generate a custom url',
    }),
    ApiResponse({
      status: 201,
      description: 'Custom url generated successfully',
      example: generateDocSchema<UrlReadModel>({ data: mockReadModels.url }),
    }),
  );
