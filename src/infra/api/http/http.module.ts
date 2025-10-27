import {
  GenerateCustomUrlUseCase,
  ListUserUrlsUseCase,
  RedirectUrlUseCase,
  UpdateUrlUseCase,
} from '@app/application/usecases/url';
import {
  ForgotPasswordUseCase,
  GenerateRandomUrlUseCase,
  GetCurrentLoginUserUseCase,
  LoginUserUseCase,
  RegisterUserUseCase,
  ResendVerificationEmailUseCase,
  ResetPasswordUseCase,
  VerifyEmailUseCase,
} from '@app/application/usecases/user';
import { Module } from '@nestjs/common';

import { AdaptorModule } from '../../adaptors';
import { JwtModule } from '../../hash/jwt/jwt.module';
import { AppV1Controller } from './v1/app.controller';
import { AuthV1Controller } from './v1/auth.controller';
import { UrlV1Controller } from './v1/url.controller';
import { UserV1Controller } from './v1/user.controller';

@Module({
  imports: [JwtModule, AdaptorModule],
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
  ],
})
export class HttpModule {}
