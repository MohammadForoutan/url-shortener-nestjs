import {
  ForgotPasswordUseCase,
  GenerateCustomUrlUseCase,
  GenerateRandomUrlUseCase,
  GetCurrentLoginUserUseCase,
  ListUserUrlsUseCase,
  LoginUserUseCase,
  RedirectUrlUseCase,
  RegisterUserUseCase,
  ResendVerificationEmailUseCase,
  ResetPasswordUseCase,
  UpdateUrlUseCase,
  VerifyEmailUseCase,
} from '@app/application/url-shortener/usecases';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { EmailModule } from '../email';
import { GlobalExceptionFilter } from '../exceptions/exception.filter';
import { JwtModule } from '../hash/jwt/jwt.module';
import { AppV1Controller } from './v1/app.controller';
import { AuthV1Controller } from './v1/auth.controller';
import { UrlV1Controller } from './v1/url.controller';
import { UserV1Controller } from './v1/user.controller';

@Module({
  imports: [JwtModule, EmailModule],
  controllers: [
    AppV1Controller,
    UserV1Controller,
    AuthV1Controller,
    UrlV1Controller,
  ],
  // use cases providers
  providers: [
    // AUTH
    RegisterUserUseCase,
    LoginUserUseCase,
    VerifyEmailUseCase,
    ResendVerificationEmailUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    // USER
    GetCurrentLoginUserUseCase,
    // URL
    GenerateRandomUrlUseCase,
    GenerateCustomUrlUseCase,
    RedirectUrlUseCase,
    ListUserUrlsUseCase,
    UpdateUrlUseCase,

    // EXCEPTION FILTER
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class HttpModule {}
