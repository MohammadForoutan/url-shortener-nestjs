import { HashService, JwtServicePort } from '@app/application/ports';
// TODO: implement port for environment variables
import { envConfig } from '@app/infra';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRepository } from '../../ports';

interface LoginUserCommand {
  email: string;
  password: string;
}

interface LoginUserResponse {
  accessToken: string;
}

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly jwtService: JwtServicePort,
    private readonly hashService: HashService,
  ) {}

  async execute(input: LoginUserCommand): Promise<LoginUserResponse> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.hashService.verifyPassword(
      input.password,
      user.password.value,
    );
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
    if (!user.isEmailVerified && envConfig.EMAIL_VERIFICATION)
      throw new UnauthorizedException('Email not verified');

    const accessToken = await this.jwtService.sign({
      userId: user.id,
      email: user.email.value,
    });

    return { accessToken };
  }
}
