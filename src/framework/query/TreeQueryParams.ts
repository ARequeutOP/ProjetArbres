import { SortOrder } from "./SortOrder";

export type TreeQueryParams = {
    offset?: number;
    sortOrder?: SortOrder;
    limit?: number;
    searchText?: string;
}