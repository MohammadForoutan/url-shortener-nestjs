import type { JwtPayload } from '@app/application/ports';

import { Pagination } from '@app/application/common';
import { UrlReadModel } from '@app/application/read-models';
import {
  GenerateCustomUrlUseCase,
  GenerateRandomUrlUseCase,
  ListUserUrlsUseCase,
  RedirectUrlUseCase,
  UpdateUrlUseCase,
} from '@app/application/usecases/url';
import { GetJwtPayload } from '@app/infra/decorators';
import { AuthJwtGuard } from '@app/infra/guards';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationResponse, ResponseFormat } from '../../pagination';
import {
  GenerateCustomUrlDoc,
  GenerateRandomUrlDoc,
  ListUserUrlsDoc,
  UpdateUrlDoc,
} from './docs/url.docs';
import {
  GenerateCustomUrlDto,
  GenerateRandomUrlDto,
  QueryUrlListDto,
  UpdateUrlDto,
} from './dtos';

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
    private readonly listUserUrlsUseCase: ListUserUrlsUseCase,
    private readonly updateUrlUseCase: UpdateUrlUseCase,
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
      expirationDate: generateRandomUrlDto.expirationDate,
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
      expirationDate: generateCustomUrlDto.expirationDate,
    });

    return {
      data: new UrlReadModel(response.url),
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Custom url generated successfully',
    };
  }

  @UseGuards(AuthJwtGuard)
  @UpdateUrlDoc()
  @Put(':id')
  async updateUrl(
    @Param('id') id: string,
    @Body() updateUrlDto: UpdateUrlDto,
    @GetJwtPayload() payload: JwtPayload,
  ): Promise<ResponseFormat<UrlReadModel>> {
    const response = await this.updateUrlUseCase.execute({
      id,
      originalUrl: updateUrlDto.originalUrl,
      shortUrl: updateUrlDto.customShortString,
      expirationDate: updateUrlDto.expirationDate,
      ownerId: payload.userId,
    });

    return {
      data: new UrlReadModel(response.url),
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Url updated successfully',
    };
  }

  // list of user urls
  @UseGuards(AuthJwtGuard)
  @ListUserUrlsDoc()
  @Get('list')
  async listUserUrls(
    @Query() query: QueryUrlListDto,
    @GetJwtPayload() payload: JwtPayload,
  ): Promise<ResponseFormat<PaginationResponse<UrlReadModel>>> {
    const pagination = Pagination.for(query.page, query.limit);
    const response = await this.listUserUrlsUseCase.execute({
      ownerId: payload.userId,
      pagination,
    });

    return {
      data: {
        hasNextPage: response.urls.hasNextPage,
        hasPreviousPage: response.urls.hasPreviousPage,
        nextPage: response.urls.nextPage,
        previousPage: response.urls.previousPage,
        total: response.urls.total,
        page: response.urls.page,
        limit: response.urls.limit,
        totalPages: response.urls.totalPages,
        items: response.urls.models.map(url => new UrlReadModel(url)),
      },
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User urls listed successfully',
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
