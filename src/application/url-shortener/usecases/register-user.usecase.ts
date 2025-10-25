import { User } from '@app/domain/url-shortener/user';
import { Password } from '@app/domain/url-shortener/value-objects/password.vo';
import { HashUtil } from '@app/infra/hash';
import { ConflictException, Injectable } from '@nestjs/common';

import { EmailService } from '../ports/email.service';
import { UserRepository } from '../ports/user.repository';

interface RegisterUserCommand {
  email: string;
  password: string;
}

interface RegisterUserResponse {
  user: User;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(input: RegisterUserCommand): Promise<RegisterUserResponse> {
    const isUserAlreadyExists = await this.userRepository.findByEmail(
      input.email,
    );
    if (isUserAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const password = Password.fromInput(input.password);
    const hashedPassword = await HashUtil.hashPassword(password.value);

    const user = User.create({
      email: input.email,
      password: Password.fromValid(hashedPassword),
      verificationToken: null,
      verificationTokenExpiresAt: null,
      isEmailVerified: false,
    });

    const verificationToken = user.generateVerificationToken();

    const createdUser = await this.userRepository.create(user);

    // TODO: where should I store this token?
    await this.emailService.sendVerificationEmail(
      input.email,
      verificationToken,
    );

    return {
      user: createdUser,
    };
  }
}
