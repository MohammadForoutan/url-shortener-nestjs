import {
  LoginUserUseCase,
  RegisterUserUseCase,
  ResendVerificationEmailUseCase,
  VerifyEmailUseCase,
} from '@app/application/url-shortener/usecases';
import { ResponseFormat } from '@app/infra/interfaces';
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

import { LoginDto, RegisterDto } from './dtos';

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
}
