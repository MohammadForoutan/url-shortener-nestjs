import type { NotUndefined, ResponseFormat } from '../../../../interfaces';

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
