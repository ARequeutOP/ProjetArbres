import { CacheEntry } from "../cache/CacheEntry";
import { ApiResponseDto } from "../dto/ApiResponseDto";
import { TreeDetailDto } from "../dto/TreeDetailDto";
import { TreeListItemDto } from "../dto/TreeListItemDto";
import { TreeQueryParams } from "../query/TreeQueryParams";

export interface ITreeCacheDatasource {
    fetchTrees(queryParams: TreeQueryParams): Promise<CacheEntry<ApiResponseDto<TreeListItemDto>> | null>;
    fetchTreeById(id: string): Promise<CacheEntry<ApiResponseDto<TreeDetailDto>> | null>;
    saveTreeList(queryParams: TreeQueryParams, data: ApiResponseDto<TreeListItemDto>): Promise<void>;
    saveTreeDetail(id: string, data: ApiResponseDto<TreeDetailDto>): Promise<void>;
    clearAll(): Promise<void>;
    clearTreeList(queryParams: TreeQueryParams): Promise<void>;
    clearTreeDetail(id: string): Promise<void>;
}

export const TreeCacheDatasourceKey = "TreeCacheDatasourceKey";