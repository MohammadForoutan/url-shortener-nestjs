export type OrderSort = 'asc' | 'desc';

export interface SortBy<T, SortKey extends keyof T> {
  sortBy: SortKey;
  sortOrder: OrderSort;
}
