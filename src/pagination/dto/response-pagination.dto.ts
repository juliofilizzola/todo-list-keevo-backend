export interface IResponsePagination<T> {
  data: T[];
  count: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
