export interface ApiFilter<
  FilterKey extends string = string,
  FilterValue = string,
> {
  filterBy: FilterKey;
  filterValue: FilterValue;
}

export interface ApiSort<
  T,
  SortKey extends keyof T,
  SortOrder = 'asc' | 'desc',
> {
  sortBy: SortKey;
  sortOrder: SortOrder;
}

export interface ApiSearch<T, SearchKey extends keyof T, SearchValue = string> {
  searchBy: SearchKey;
  searchValue: SearchValue;
}
