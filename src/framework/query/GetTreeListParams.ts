import { SortOrder } from "./SortOrder";

export type GetTreeListParams = {
    numberTreesLoaded: number;
    sortOrder: SortOrder;
    searchText: string;
}