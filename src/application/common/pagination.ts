export type PaginatedRecord<FieldName, FieldType> = FieldName extends string
  ? Record<FieldName, FieldType[]> & { totalPages: number }
  : never;

export class Pagination<FieldType> {
  public readonly models: FieldType[];
  public readonly nextPage: number;
  public readonly hasNextPage: boolean;
  public readonly hasPreviousPage: boolean;
  public readonly previousPage: number;
  public readonly totalPages: number;

  private readonly _page: number;
  private readonly _limit: number;
  private readonly _total: number;

  get skip(): number {
    return (this._page - 1) * this._limit;
  }
  get take(): number {
    return this._limit;
  }

  get page(): number {
    return this._page;
  }
  get limit(): number {
    return this._limit;
  }
  get total(): number {
    return this._total;
  }

  private constructor(
    models: FieldType[],
    page: number,
    limit: number,
    total: number,
  ) {
    this.hasNextPage = page * limit + models.length < total;
    this.nextPage = this.hasNextPage ? page + 1 : page;
    this.totalPages = Math.ceil(total / limit);
    this.hasPreviousPage = page > 1;
    this.previousPage = this.hasPreviousPage ? page - 1 : page;
    this.models = models;

    this._page = page;
    this._limit = limit;
    this._total = total;
  }

  static of<FieldType>(
    models: FieldType[],
    page: number,
    limit: number,
    total: number,
  ): Pagination<FieldType> {
    return new Pagination<FieldType>(models, page, limit, total);
  }

  static for(page: number, limit: number): Pagination<void> {
    let normalizedPage = page;
    let normalizedLimit = limit;
    if (page < 1) {
      normalizedPage = 1;
    }
    if (limit < 1) {
      normalizedLimit = 10;
    }
    if (limit > 100) {
      normalizedLimit = 100;
    }
    return new Pagination([], normalizedPage, normalizedLimit, 0);
  }
}
