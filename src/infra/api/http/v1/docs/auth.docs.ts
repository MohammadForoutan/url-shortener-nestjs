import { MSG } from '@app/application/common';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { generateResponseSchema } from '../../utils';
import { LoginUserResponse } from '../responses/auth';

export const LoginDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Login a user',
      description: 'Login a user',
    }),
    generateResponseSchema({
      model: LoginUserResponse,
      description: 'User logged in successfully',
      status: HttpStatus.OK,
      success: true,
      message: MSG.LOGIN_SUCCESS,
    }),
    generateResponseSchema({
      model: null,
      description: 'User not found',
      status: HttpStatus.NOT_FOUND,
      success: false,
      message: MSG.USER_NOT_FOUND,
    }),
    generateResponseSchema({
      model: null,
      description: 'Invalid credentials',
      status: HttpStatus.BAD_REQUEST,
      success: false,
      message: MSG.INVALID_CREDENTIALS,
    }),
  );

export const RegisterDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Register a user',
      description: 'Register a user',
    }),
    generateResponseSchema({
      model: null,
      description: 'User registered successfully',
      status: HttpStatus.CREATED,
      success: true,
    }),
    generateResponseSchema({
      model: null,
      description: 'User already exists',
      status: HttpStatus.CONFLICT,
      success: false,
      message: MSG.USER_ALREADY_EXISTS,
    }),
  );

export const VerifyEmailDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Verify an email',
      description: 'Verify an email',
    }),
    generateResponseSchema({
      model: null,
      description: 'Email verified successfully',
      status: HttpStatus.OK,
      success: true,
      message: MSG.VERIFY_EMAIL_SUCCESS,
    }),
    generateResponseSchema({
      model: null,
      description: 'User not found',
      status: HttpStatus.NOT_FOUND,
      success: false,
      message: MSG.USER_NOT_FOUND,
    }),
    generateResponseSchema({
      model: null,
      description: 'Email already verified',
      status: HttpStatus.BAD_REQUEST,
      success: false,
      message: MSG.EMAIL_ALREADY_VERIFIED,
    }),
  );

export const ResendVerificationEmailDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Resend verification email',
      description: 'Resend verification email',
    }),
    generateResponseSchema({
      model: null,
      description: 'Verification email sent successfully',
      status: HttpStatus.OK,
      success: true,
      message: MSG.RESEND_VERIFICATION_EMAIL_SUCCESS,
    }),
    generateResponseSchema({
      model: null,
      description: 'User not found',
      status: HttpStatus.NOT_FOUND,
      success: false,
      message: MSG.USER_NOT_FOUND,
    }),
    generateResponseSchema({
      model: null,
      description: 'Email already verified',
      status: HttpStatus.BAD_REQUEST,
      success: false,
      message: MSG.EMAIL_ALREADY_VERIFIED,
    }),
  );

export const ForgotPasswordDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Forgot password',
      description: 'Forgot password',
    }),
    generateResponseSchema({
      model: null,
      description: 'Password reset email sent successfully',
      status: HttpStatus.OK,
      success: true,
      message: MSG.FORGOT_PASSWORD_SUCCESS,
    }),
    generateResponseSchema({
      model: null,
      description: 'User not found',
      status: HttpStatus.NOT_FOUND,
      success: false,
      message: MSG.USER_NOT_FOUND,
    }),
  );

export const ResetPasswordDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Reset password',
      description: 'Reset password',
    }),
    generateResponseSchema({
      model: null,
      description: 'Password reset successfully',
      status: HttpStatus.OK,
      success: true,
      message: MSG.RESET_PASSWORD_SUCCESS,
    }),
    generateResponseSchema({
      model: null,
      description: 'User not found',
      status: HttpStatus.NOT_FOUND,
      success: false,
      message: MSG.USER_NOT_FOUND,
    }),
    generateResponseSchema({
      model: null,
      description: 'Password reset token expired',
      status: HttpStatus.BAD_REQUEST,
      success: false,
      message: MSG.PASSWORD_RESET_TOKEN_EXPIRED,
    }),
  );
