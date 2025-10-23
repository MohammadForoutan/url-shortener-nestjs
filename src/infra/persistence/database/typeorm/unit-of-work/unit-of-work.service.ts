import type { DataSource, EntityManager } from 'typeorm';

import { Injectable, Scope } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable({
  scope: Scope.REQUEST,
})
/**
 * Unit of Work pattern implementation for managing database transactions.
 * Ensures atomic operations and data consistency across multiple repositories.
 *
 * @see https://github.com/LuanMaik/nestjs-unit-of-work
 */
export class TypeormUnitOfWork {
  private manager: EntityManager;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.manager = this.dataSource.manager;
  }

  async doTransactional<T>(
    fn: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    return this.dataSource.transaction(async (manager: EntityManager) => {
      this.manager = manager;
      const result = await fn(manager);

      return result as T;
    });
  }

  getManager() {
    return this.manager;
  }
}
