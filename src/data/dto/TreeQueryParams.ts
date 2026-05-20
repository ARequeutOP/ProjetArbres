import { SortOrder } from "@/src/domain/usecases/types/GetTreeListParams";

export type TreeQueryParams = {
    offset?: number;
    sortOrder?: SortOrder;
    limit?: number;
}