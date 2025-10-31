import { UserReadModel } from '@app/application/read-models';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { generateResponseSchema } from '../../utils';

export const GetMeDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get the current user',
      description: 'Get the current user',
    }),
    generateResponseSchema({
      model: UserReadModel,
      description: 'User found',
      status: HttpStatus.OK,
      success: true,
    }),
  );
