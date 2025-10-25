import type { HttpStatus } from '@nestjs/common';

export type NotUndefined<T> = T extends undefined ? never : T;

export interface ResponseFormat<T = unknown> {
  data: NotUndefined<T>;
  statusCode: HttpStatus;
  success: boolean;
  message?: string | string[];
}
