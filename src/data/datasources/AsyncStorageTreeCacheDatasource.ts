import { ITreeCacheDatasource } from "@/src/framework/datasources/ITreeCacheDatasource";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CacheEntry } from "../../framework/cache/CacheEntry";
import { ApiResponseDto } from "../../framework/dto/ApiResponseDto";
import { TreeDetailDto } from "../../framework/dto/TreeDetailDto";
import { TreeListItemDto } from "../../framework/dto/TreeListItemDto";
import { TreeQueryParams } from "../../framework/query/TreeQueryParams";
import { buildTreeDetailCacheKey, buildTreeListCacheKey } from "../utils/treeCacheKeys";

export const AsyncTreeStorageCacheDatasource: ITreeCacheDatasource = {
    async fetchTrees(queryParams: TreeQueryParams): Promise<CacheEntry<ApiResponseDto<TreeListItemDto>> | null> {
        const key = buildTreeListCacheKey(queryParams);
        const result = await AsyncStorage.getItem(key);
        if (!result) return null;
        return JSON.parse(result);
    },
    async fetchTreeById(id: string): Promise<CacheEntry<ApiResponseDto<TreeDetailDto>> | null> {
        const key = buildTreeDetailCacheKey(id);
        const result = await AsyncStorage.getItem(key);
        if (!result) return null;
        return JSON.parse(result);
    },
    saveTreeList(queryParams: TreeQueryParams, data: ApiResponseDto<TreeListItemDto>): Promise<void> {
        const key = buildTreeListCacheKey(queryParams);
        const entry = {
            metadata: {
                savedAt: Date.now(),
            },
            data: data,
        }
        return AsyncStorage.setItem(key, JSON.stringify(entry));
    },
    saveTreeDetail(id: string, data: ApiResponseDto<TreeDetailDto>): Promise<void> {
        const key = buildTreeDetailCacheKey(id);
        const entry = {
            metadata: {
                savedAt: Date.now(),
            },
            data: data,
        }
        return AsyncStorage.setItem(key, JSON.stringify(entry));
    },
    clearAll(): Promise<void> {
        return AsyncStorage.clear();
    },
    clearTreeList(queryParams: TreeQueryParams): Promise<void> {
        const key = buildTreeListCacheKey(queryParams);
        return AsyncStorage.removeItem(key);
    },
    clearTreeDetail(id: string): Promise<void> {
        const key = buildTreeDetailCacheKey(id);
        return AsyncStorage.removeItem(key);
    },
}