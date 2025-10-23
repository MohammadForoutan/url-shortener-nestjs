import type { UserReadModel } from '@app/application/url-shortener/read-model';

import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { generateDocSchema } from './utils';
import { mockReadModels } from './utils/mock-read-models';

export const GetMeDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get the current user',
      description: 'Get the current user',
    }),
    ApiResponse({
      status: 200,
      description: 'User found',
      example: generateDocSchema<UserReadModel>({ data: mockReadModels.user }),
    }),
  );
