export enum SortOrder {
    ASC,
    DESC,
    DEFAULT,
}

export type GetTreeListParams = {
    numberTreesLoaded: number;
    sortOrder: SortOrder;
}