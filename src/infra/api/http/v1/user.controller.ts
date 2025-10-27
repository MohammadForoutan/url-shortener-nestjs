import type { JwtPayload } from '@app/application/ports';

import { ResponseFormat } from '@app/application/common';
import { UserReadModel } from '@app/application/read-models';
import { GetCurrentLoginUserUseCase } from '@app/application/usecases/user';
import { GetJwtPayload } from '@app/infra/decorators';
import { AuthJwtGuard } from '@app/infra/guards';
import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetMeDoc } from './docs';

@Controller({
  path: 'users',
  version: '1',
})
@ApiTags('UserV1')
export class UserV1Controller {
  constructor(
    private readonly getCurrentLoginUserUseCase: GetCurrentLoginUserUseCase,
  ) {}
  @UseGuards(AuthJwtGuard)
  @GetMeDoc()
  @Get('me')
  async getMe(
    @GetJwtPayload() payload: JwtPayload,
  ): Promise<ResponseFormat<UserReadModel>> {
    const response = await this.getCurrentLoginUserUseCase.execute({
      userId: payload.userId,
    });

    return {
      data: response.user,
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User found',
    };
  }
}
