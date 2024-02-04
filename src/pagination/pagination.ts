import { IResponsePagination } from './dto/response-pagination.dto';
import { IBodyPagination } from './dto/body-pagination.dto';

export function paginateResponse<T>(
  data: IBodyPagination<T>,
): IResponsePagination<T> {
  const { total, limit, page, result } = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;

  return {
    data: result,
    count: total,
    currentPage: page,
    nextPage,
    prevPage,
    lastPage,
  };
}
