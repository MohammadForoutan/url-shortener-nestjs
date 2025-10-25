import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { HttpException, HttpStatus } from '@nestjs/common';

import type { ResponseFormat } from '../interfaces';

interface HttpExceptionResponse {
  message: string | string[];
  statusCode: HttpStatus;
  success: boolean;
}

export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[];
    if (exception instanceof HttpException) {
      message = (exception.getResponse() as HttpExceptionResponse).message;
    } else {
      message = 'Internal server error';
    }

    const responseFormat: ResponseFormat<null> = {
      data: null,
      statusCode,
      success: false,
      message,
    };

    response.status(statusCode).json(responseFormat);
  }
}
