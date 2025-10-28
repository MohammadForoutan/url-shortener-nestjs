import type { HttpStatus } from '@nestjs/common';

export type NotUndefined<T> = T extends undefined ? never : T;

export interface ResponseFormat<T = unknown> {
  data: NotUndefined<T>;
  statusCode: HttpStatus;
  success: boolean;
  message?: string | string[];
}

export interface PaginationResponse<T = unknown> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}
