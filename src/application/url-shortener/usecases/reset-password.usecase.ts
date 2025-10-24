import { Password } from '@app/domain/url-shortener/value-objects';
import { HashUtil } from '@app/infra';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from '../ports/user.repository';

interface ResetPasswordCommand {
  passwordResetToken: string;
  password: string;
}

interface ResetPasswordResponse {
  message: string;
}

@Injectable()
export class ResetPasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: ResetPasswordCommand): Promise<ResetPasswordResponse> {
    const user = await this.userRepository.findByPasswordResetToken(
      input.passwordResetToken,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isTokenExpired = user.isPasswordResetTokenExpired();
    if (isTokenExpired) {
      throw new BadRequestException('Password reset token expired');
    }

    const password = Password.fromInput(input.password);
    const hashedPassword = await HashUtil.hashPassword(password.value);

    user.setPassword(Password.fromValid(hashedPassword));
    user.expirePasswordResetToken();
    await this.userRepository.update(user);

    return {
      message: 'Password reset successfully',
    };
  }
}
