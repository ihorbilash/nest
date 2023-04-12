
export class PaginateResultDto<E> {
    data: E[]
    page: number
    limit: number
    totalCount: number
}