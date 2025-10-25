import { ResponseFormat } from '@app/infra';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { EmailService } from '../ports/email.service';
import { UserRepository } from '../ports/user.repository';

interface ForgotPasswordCommand {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(
    input: ForgotPasswordCommand,
  ): Promise<ResponseFormat<ForgotPasswordResponse>> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordResetToken = user.generatePasswordResetToken();

    await this.emailService.sendPasswordResetEmail(
      input.email,
      passwordResetToken,
    );

    await this.userRepository.update(user);

    return {
      data: {
        message: 'Password reset email sent successfully',
      },
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Password reset email sent successfully',
    };
  }
}
