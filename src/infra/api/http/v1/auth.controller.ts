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
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dtos';

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
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<ResponseFormat<{ accessToken: string }>> {
    const response = await this.loginUserUseCase.execute(loginDto);

    return {
      data: response,
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User login successfully',
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ResponseFormat<void>> {
    await this.registerUserUseCase.execute(registerDto);
    return {
      data: undefined,
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User registered successfully',
    };
  }

  @Get('verify-email')
  async verifyEmail(
    @Query('token') token: string,
  ): Promise<ResponseFormat<void>> {
    await this.verifyEmailUseCase.execute({ token });
    return {
      data: undefined,
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Email verified successfully',
    };
  }

  @Get('resend-verification-email')
  async sendVerificationEmail(
    @Query('email') email: string,
  ): Promise<ResponseFormat<void>> {
    await this.resendVerificationEmailUseCase.execute({ email });
    return {
      data: undefined,
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Verification email sent successfully',
    };
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<ResponseFormat<void>> {
    await this.forgotPasswordUseCase.execute(forgotPasswordDto);
    return {
      data: undefined,
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Password reset email sent successfully',
    };
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ResponseFormat<void>> {
    await this.resetPasswordUseCase.execute(resetPasswordDto);
    return {
      data: undefined,
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Password reset successfully',
    };
  }
}
