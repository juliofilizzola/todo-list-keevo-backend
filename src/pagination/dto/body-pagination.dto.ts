export interface IBodyPagination<T> {
  total: number;
  result: T[];
  page: number;
  limit: number;
}
