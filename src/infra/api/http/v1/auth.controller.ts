import { MSG } from '@app/application/common';
import {
  ForgotPasswordUseCase,
  LoginUserUseCase,
  RegisterUserUseCase,
  ResendVerificationEmailUseCase,
  ResetPasswordUseCase,
  VerifyEmailUseCase,
} from '@app/application/usecases/user';
import { ResponseFormat } from '@app/infra/api';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  ForgotPasswordDoc,
  LoginDoc,
  RegisterDoc,
  ResendVerificationEmailDoc,
  ResetPasswordDoc,
  VerifyEmailDoc,
} from './docs';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dtos';
import { LoginUserResponse } from './responses';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiTags('AuthV1')
export class AuthV1Controller {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
    private verifyEmailUseCase: VerifyEmailUseCase,
    private resendVerificationEmailUseCase: ResendVerificationEmailUseCase,
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @LoginDoc()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<ResponseFormat<LoginUserResponse>> {
    const response = await this.loginUserUseCase.execute(loginDto);

    return {
      data: { accessToken: response.accessToken },
      statusCode: HttpStatus.OK,
      success: true,
      message: MSG.LOGIN_SUCCESS,
    };
  }

  @RegisterDoc()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ResponseFormat<null>> {
    await this.registerUserUseCase.execute(registerDto);
    return {
      data: null,
      statusCode: HttpStatus.CREATED,
      success: true,
      message: MSG.REGISTER_SUCCESS,
    };
  }

  @VerifyEmailDoc()
  @Get('verify-email')
  async verifyEmail(
    @Query('token') token: string,
  ): Promise<ResponseFormat<null>> {
    await this.verifyEmailUseCase.execute({ token });
    return {
      data: null,
      statusCode: HttpStatus.OK,
      success: true,
      message: MSG.VERIFY_EMAIL_SUCCESS,
    };
  }

  @ResendVerificationEmailDoc()
  @Get('resend-verification-email')
  async sendVerificationEmail(
    @Query('email') email: string,
  ): Promise<ResponseFormat<null>> {
    await this.resendVerificationEmailUseCase.execute({ email });
    return {
      data: null,
      statusCode: HttpStatus.OK,
      success: true,
      message: MSG.RESEND_VERIFICATION_EMAIL_SUCCESS,
    };
  }

  @ForgotPasswordDoc()
  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<ResponseFormat<null>> {
    await this.forgotPasswordUseCase.execute(forgotPasswordDto);
    return {
      data: null,
      statusCode: HttpStatus.OK,
      success: true,
      message: MSG.FORGOT_PASSWORD_SUCCESS,
    };
  }

  @ResetPasswordDoc()
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ResponseFormat<null>> {
    await this.resetPasswordUseCase.execute(resetPasswordDto);
    return {
      data: null,
      statusCode: HttpStatus.OK,
      success: true,
      message: MSG.RESET_PASSWORD_SUCCESS,
    };
  }
}
