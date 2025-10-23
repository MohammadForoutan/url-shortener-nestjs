import { envConfig } from '@app/infra';
import { HashUtil, JwtServiceImp } from '@app/infra/hash';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRepository } from '../ports/user.repository';

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
    private readonly jwtService: JwtServiceImp,
  ) {}

  async execute(input: LoginUserCommand): Promise<LoginUserResponse> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await HashUtil.verifyPassword(
      input.password,
      user.password.value,
    );
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
    if (!user.isEmailVerified && envConfig.NODE_ENV === 'production')
      throw new UnauthorizedException('Email not verified');

    const accessToken = await this.jwtService.sign({
      userId: user.id,
      email: user.email.value,
    });

    return { accessToken };
  }
}
