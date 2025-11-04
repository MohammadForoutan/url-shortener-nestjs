import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from '../../ports';
import { UserReadModel } from '../../read-models';

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
      throw new NotFoundException(MSG.USER_NOT_FOUND);
    }

    return { user: new UserReadModel(user) };
  }
}
