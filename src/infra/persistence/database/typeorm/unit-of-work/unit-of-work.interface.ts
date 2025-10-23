import type { EntityManager } from 'typeorm';

export abstract class TypeormUnitOfWorkInterface {
  abstract getManager(): EntityManager;
  abstract doTransactional<T>(
    fn: (manager: EntityManager) => Promise<T>,
  ): Promise<T>;
}
