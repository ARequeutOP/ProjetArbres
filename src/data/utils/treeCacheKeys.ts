import { TreeQueryParams } from "../../framework/query/TreeQueryParams"

export const buildTreeListCacheKey = (queryParams: TreeQueryParams) => {
    return (
        `tree-list:`+
        `${queryParams.sortOrder ?? "DEFAULT"}:`+
        `${queryParams.searchText ?? ""}:`+
        `${queryParams.offset ?? 0}:`+
        `${queryParams.limit ?? 10}`
    )
}

export const buildTreeDetailCacheKey = (id: string) => {
    return (
        `tree-detail:${id}`
    )
}