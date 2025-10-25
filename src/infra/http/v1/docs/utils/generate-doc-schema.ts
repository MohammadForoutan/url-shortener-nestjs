import type {
  NotUndefined,
  PaginatedList,
  ResponseFormat,
} from '../../../../interfaces';

export const generateDocSchema = <T>({
  data,
}: {
  data: NotUndefined<T>;
}): ResponseFormat<T> => {
  return {
    data,
    statusCode: 200,
    success: true,
    message: 'Success',
  };
};

export const generateDocSchemaPaginatedList = <T>({
  data,
}: {
  data: NotUndefined<T>;
}): ResponseFormat<PaginatedList<T>> => {
  return {
    data: {
      items: Array(10).fill(data),
      total: 10,
      page: 1,
      limit: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      nextPage: null,
      previousPage: null,
    },
    statusCode: 200,
    success: true,
    message: 'Success',
  };
};
