import { Pagination } from '@app/application/common';
import { UrlRepository } from '@app/application/ports/url.repository';
import { Url } from '@app/domain/url/entities';
import { Injectable } from '@nestjs/common';

interface ListUserUrlsCommand {
  ownerId: string;
  pagination: Pagination;
}

interface ListUserUrlsResponse {
  urls: Pagination<Url>;
}
@Injectable()
export class ListUserUrlsUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(input: ListUserUrlsCommand): Promise<ListUserUrlsResponse> {
    const urls = await this.urlRepository.findAllByOwnerId(
      input.ownerId,
      input.pagination,
    );
    console.log({ urls });

    return { urls };
  }
}
