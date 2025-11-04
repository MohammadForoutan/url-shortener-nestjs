import { MSG } from '@app/application/common';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EmailService, UserRepository } from '../../ports';

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
      throw new NotFoundException(MSG.USER_NOT_FOUND);
    }

    if (user.isEmailVerified) {
      throw new BadRequestException(MSG.EMAIL_ALREADY_VERIFIED);
    }

    const verificationToken = user.generateVerificationToken();

    await this.userRepository.update(user);

    await this.emailService.sendVerificationEmail(
      input.email,
      verificationToken,
    );
  }
}
