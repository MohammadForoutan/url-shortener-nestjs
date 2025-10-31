import type { HttpStatus, Type } from '@nestjs/common';

import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import type { NotUndefined } from '../../pagination';

export function generateResponseSchema<T>(props: {
  model: Type<NotUndefined<T>>;
  description: string;
  status: HttpStatus;
  success: boolean;
  isPaginated?: boolean;
  message?: string | string[];
}) {
  const dataSchema =
    props.isPaginated === true
      ? {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: { $ref: getSchemaPath(props.model) },
            },
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' },
            hasNextPage: { type: 'boolean' },
            hasPreviousPage: { type: 'boolean' },
            nextPage: { type: 'number', nullable: true },
            previousPage: { type: 'number', nullable: true },
          },
          required: [
            'items',
            'total',
            'page',
            'limit',
            'totalPages',
            'hasNextPage',
            'hasPreviousPage',
          ],
        }
      : { $ref: getSchemaPath(props.model) };

  const responseSchema = {
    status: props.status,
    description: props.description,
    schema: {
      type: 'object',
      properties: {
        data: dataSchema,
        statusCode: { type: 'number', example: props.status },
        success: { type: 'boolean', example: props.success },
        message: {
          oneOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } },
          ],
          nullable: true,
        },
      },
      required: ['data', 'statusCode', 'success'],
    },
  } as const;

  return applyDecorators(
    ApiResponse(responseSchema),
    ApiExtraModels(props.model),
  );
}
