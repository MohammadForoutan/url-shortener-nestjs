import { MSG } from '@app/application/common';
import { Injectable, NotFoundException } from '@nestjs/common';

import { EmailService, UserRepository } from '../../ports';

interface ForgotPasswordCommand {
  email: string;
}

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(input: ForgotPasswordCommand): Promise<void> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new NotFoundException(MSG.USER_NOT_FOUND);
    }

    const passwordResetToken = user.generatePasswordResetToken();

    await this.emailService.sendPasswordResetEmail(
      input.email,
      passwordResetToken,
    );

    await this.userRepository.update(user);
  }
}
