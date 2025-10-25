import { Pagination } from '@app/application/common';
import { Url } from '@app/domain/url-shortener/url';
import { ApiPaginationOptions } from '@app/infra/interfaces';
import { Injectable } from '@nestjs/common';

import { UrlRepository } from '../ports/url.repository';

interface ListUserUrlsCommand {
  ownerId: string;
  pagination: ApiPaginationOptions;
}

interface ListUserUrlsResponse {
  urls: Pagination<Url>;
}
@Injectable()
export class ListUserUrlsUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(input: ListUserUrlsCommand): Promise<ListUserUrlsResponse> {
    const pagination = Pagination.for(
      input.pagination.page,
      input.pagination.limit,
    );

    const urls = await this.urlRepository.findAllByOwnerId(
      input.ownerId,
      pagination,
    );
    console.log({ urls });

    return { urls };
  }
}
