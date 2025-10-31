import { UrlReadModel } from '@app/application/read-models';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { generateResponseSchema } from '../../utils';

export const GenerateRandomUrlDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Generate a random url',
      description: 'Generate a random url',
    }),
    generateResponseSchema({
      model: UrlReadModel,
      description: 'Random url generated successfully',
      status: HttpStatus.CREATED,
      success: true,
    }),
  );

export const GenerateCustomUrlDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Generate a custom url',
      description: 'Generate a custom url',
    }),
    generateResponseSchema({
      model: UrlReadModel,
      description: 'Custom url generated successfully',
      status: HttpStatus.CREATED,
      success: true,
    }),
  );

export const ListUserUrlsDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'List user urls',
      description: 'List user urls',
    }),
    generateResponseSchema({
      model: UrlReadModel,
      description: 'User urls listed successfully',
      status: HttpStatus.OK,
      success: true,
      isPaginated: true,
    }),
  );

export const UpdateUrlDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update a url',
      description: 'Update a url',
    }),
    generateResponseSchema({
      model: UrlReadModel,
      description: 'Url updated successfully',
      status: HttpStatus.OK,
      success: true,
    }),
  );
