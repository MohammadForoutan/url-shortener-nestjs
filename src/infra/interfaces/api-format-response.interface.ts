export type NotUndefined<T> = T extends undefined ? never : T;

export interface ResponseFormat<T = any> {
  data: NotUndefined<T>;
  statusCode: number;
  success: boolean;
  message?: string;
}
