import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EmailService } from '../ports/email.service';
import { UserRepository } from '../ports/user.repository';

interface ResendVerificationEmailCommand {
  email: string;
}

@Injectable()
export class ResendVerificationEmailUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(input: ResendVerificationEmailCommand): Promise<void> {
    console.log({ input });

    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    const verificationToken = user.generateVerificationToken();

    await this.userRepository.update(user);

    await this.emailService.sendVerificationEmail(
      input.email,
      verificationToken,
    );
  }
}
