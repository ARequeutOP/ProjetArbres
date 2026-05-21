import { GetTreeListParams } from "@/src/domain/usecases/types/GetTreeListParams"
import { TreeQueryParams } from "../dto/TreeQueryParams"

export const toTreeQueryParams = (params: GetTreeListParams): TreeQueryParams => {
    return {
        offset: params.numberTreesLoaded,
        sortOrder: params.sortOrder,
        limit: 20,
        searchText: params.searchText,
    }
}