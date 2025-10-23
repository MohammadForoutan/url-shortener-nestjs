import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from '../ports/user.repository';
import { UserReadModel } from '../read-model/user.read-model';

interface GetCurrentLoginUserCommand {
  userId: string;
}

export interface GetCurrentLoginUserResponse {
  user: UserReadModel;
}

@Injectable()
export class GetCurrentLoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    input: GetCurrentLoginUserCommand,
  ): Promise<GetCurrentLoginUserResponse> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user: new UserReadModel(user) };
  }
}
