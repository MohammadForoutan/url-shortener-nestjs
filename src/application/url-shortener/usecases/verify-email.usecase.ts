import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from '../ports/user.repository';

interface VerifyEmailCommand {
  token: string;
}

@Injectable()
export class VerifyEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: VerifyEmailCommand): Promise<void> {
    const user = await this.userRepository.findByVerificationToken(input.token);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isEmailVerified) {
      user.verifyEmail();
      await this.userRepository.update(user);

      throw new BadRequestException('Email already verified');
    }

    user.verifyEmail();
    await this.userRepository.update(user);
  }
}
