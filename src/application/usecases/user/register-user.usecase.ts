import { MSG } from '@app/application/common';
import {
  EmailService,
  HashService,
  UserRepository,
} from '@app/application/ports';
import { User } from '@app/domain/user/entities';
import { Password } from '@app/domain/user/value-objects';
import { ConflictException, Injectable } from '@nestjs/common';

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
    private readonly hashService: HashService,
  ) {}

  async execute(input: RegisterUserCommand): Promise<RegisterUserResponse> {
    const isUserAlreadyExists = await this.userRepository.findByEmail(
      input.email,
    );
    if (isUserAlreadyExists) {
      throw new ConflictException(MSG.USER_ALREADY_EXISTS);
    }

    const password = Password.fromInput(input.password);
    const hashedPassword = await this.hashService.hashPassword(password.value);

    const user = User.create({
      email: input.email,
      password: Password.fromValid(hashedPassword),
      verificationToken: null,
      verificationTokenExpiresAt: null,
      isEmailVerified: false,
    });

    const verificationToken = user.generateVerificationToken();

    const createdUser = await this.userRepository.create(user);

    await this.emailService.sendVerificationEmail(
      input.email,
      verificationToken,
    );

    return {
      user: createdUser,
    };
  }
}
