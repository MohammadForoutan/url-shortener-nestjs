import type { JwtPayload } from '@app/infra/hash';

import { UrlReadModel } from '@app/application/url-shortener/read-model/url.read-model';
import {
  GenerateCustomUrlUseCase,
  GenerateRandomUrlUseCase,
  RedirectUrlUseCase,
} from '@app/application/url-shortener/usecases';
import { GetJwtPayload } from '@app/infra/decorators';
import { AuthJwtGuard } from '@app/infra/guards';
import { ResponseFormat } from '@app/infra/interfaces';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GenerateCustomUrlDoc, GenerateRandomUrlDoc } from './docs/url.docs';
import { GenerateCustomUrlDto, GenerateRandomUrlDto } from './dtos';

@Controller({
  path: 'urls',
  version: '1',
})
@ApiTags('UrlV1')
export class UrlV1Controller {
  constructor(
    private readonly generateRandomUrlUseCase: GenerateRandomUrlUseCase,
    private readonly generateCustomUrlUseCase: GenerateCustomUrlUseCase,
    private readonly redirectUrlUseCase: RedirectUrlUseCase,
  ) {}

  @UseGuards(AuthJwtGuard)
  @GenerateRandomUrlDoc()
  @Post('generate-random')
  async generateRandomUrl(
    @Body() generateRandomUrlDto: GenerateRandomUrlDto,
    @GetJwtPayload() payload: JwtPayload,
  ): Promise<ResponseFormat<UrlReadModel>> {
    const response = await this.generateRandomUrlUseCase.execute({
      originalUrl: generateRandomUrlDto.originalUrl,
      ownerId: payload.userId,
    });
    return {
      data: new UrlReadModel(response.url),
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Random url generated successfully',
    };
  }

  @UseGuards(AuthJwtGuard)
  @GenerateCustomUrlDoc()
  @Post('generate-custom')
  async generateCustomUrl(
    @Body() generateCustomUrlDto: GenerateCustomUrlDto,
    @GetJwtPayload() payload: JwtPayload,
  ): Promise<ResponseFormat<UrlReadModel>> {
    const response = await this.generateCustomUrlUseCase.execute({
      customShortString: generateCustomUrlDto.customShortString,
      originalUrl: generateCustomUrlDto.originalUrl,
      ownerId: payload.userId,
    });

    return {
      data: new UrlReadModel(response.url),
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Custom url generated successfully',
    };
  }

  @Get('/redirect/:shortUrl')
  async redirectUrl(
    @Param('shortUrl') shortUrl: string,
  ): Promise<ResponseFormat<UrlReadModel>> {
    const response = await this.redirectUrlUseCase.execute({ shortUrl });
    return {
      data: new UrlReadModel(response.url),
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Url redirected successfully',
    };
  }
}
