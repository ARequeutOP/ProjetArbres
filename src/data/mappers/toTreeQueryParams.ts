import { GetTreeListParams } from "@/src/framework/query/GetTreeListParams"
import { TreeQueryParams } from "../../framework/query/TreeQueryParams"

export const toTreeQueryParams = (params: GetTreeListParams): TreeQueryParams => {
    return {
        offset: params.numberTreesLoaded,
        sortOrder: params.sortOrder,
        limit: 20,
        searchText: params.searchText,
    }
}