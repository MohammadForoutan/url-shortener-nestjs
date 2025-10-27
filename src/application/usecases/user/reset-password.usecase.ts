import { Password } from '@app/domain/user/value-objects';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { HashService, UserRepository } from '../../ports';

interface ResetPasswordCommand {
  passwordResetToken: string;
  password: string;
}

interface ResetPasswordResponse {
  message: string;
}

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

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
    const hashedPassword = await this.hashService.hashPassword(password.value);

    user.setPassword(Password.fromValid(hashedPassword));
    user.expirePasswordResetToken();
    await this.userRepository.update(user);

    return {
      message: 'Password reset successfully',
    };
  }
}
