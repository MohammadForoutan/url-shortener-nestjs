import type { UrlReadModel } from '@app/application/read-models';

import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { generateDocSchema, generateDocSchemaPaginatedList } from '../../utils';
import { mockReadModels } from '../../utils/mock-read-models';

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

export const ListUserUrlsDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'List user urls',
      description: 'List user urls',
    }),
    ApiResponse({
      status: 200,
      description: 'User urls listed successfully',
      example: generateDocSchemaPaginatedList({ data: mockReadModels.url }),
    }),
  );

export const UpdateUrlDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update a url',
      description: 'Update a url',
    }),
    ApiResponse({
      status: 200,
      description: 'Url updated successfully',
      example: generateDocSchema<UrlReadModel>({ data: mockReadModels.url }),
    }),
  );
