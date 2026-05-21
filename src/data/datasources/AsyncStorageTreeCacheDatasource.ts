import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiResponseDto } from "../dto/ApiResponseDto";
import { TreeDetailDto } from "../dto/TreeDetailDto";
import { TreeListItemDto } from "../dto/TreeListItemDto";
import { TreeQueryParams } from "../dto/TreeQueryParams";
import { CacheEntry } from "../types/CacheEntry";
import { buildTreeDetailCacheKey, buildTreeListCacheKey } from "../utils/treeCacheKeys";
import { ITreeCacheDatasource } from "./ITreeCacheDatasource";


export class AsyncTreeStorageCacheDatasource implements ITreeCacheDatasource {
    async fetchTrees(queryParams: TreeQueryParams): Promise<CacheEntry<ApiResponseDto<TreeListItemDto>> | null> {
        const key = buildTreeListCacheKey(queryParams);
        const result = await AsyncStorage.getItem(key);
        if (!result) return null;
        return JSON.parse(result);
    }
    async fetchTreeById(id: string): Promise<CacheEntry<ApiResponseDto<TreeDetailDto>> | null> {
        const key = buildTreeDetailCacheKey(id);
        const result = await AsyncStorage.getItem(key);
        if (!result) return null;
        return JSON.parse(result);
    }
    saveTreeList(queryParams: TreeQueryParams, data: ApiResponseDto<TreeListItemDto>): Promise<void> {
        const key = buildTreeListCacheKey(queryParams);
        const entry = {
            metadata: {
                savedAt: Date.now(),
            },
            data: data,
        }
        return AsyncStorage.setItem(key, JSON.stringify(entry));
    }
    saveTreeDetail(id: string, data: ApiResponseDto<TreeDetailDto>): Promise<void> {
        const key = buildTreeDetailCacheKey(id);
        const entry = {
            metadata: {
                savedAt: Date.now(),
            },
            data: data,
        }
        return AsyncStorage.setItem(key, JSON.stringify(entry));
    }
    clearAll(): Promise<void> {
        return AsyncStorage.clear();
    }
    clearTreeList(queryParams: TreeQueryParams): Promise<void> {
        const key = buildTreeListCacheKey(queryParams);
        return AsyncStorage.removeItem(key);
    }
    clearTreeDetail(id: string): Promise<void> {
        const key = buildTreeDetailCacheKey(id);
        return AsyncStorage.removeItem(key);
    }
    
}