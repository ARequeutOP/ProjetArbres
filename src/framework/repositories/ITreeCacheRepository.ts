import { CacheEntry } from "../cache/CacheEntry";
import { TreeInfo } from "../models/TreeInfo";
import { TreeListResult } from "../models/TreeListResult";
import { GetTreeListParams } from "../query/GetTreeListParams";

export interface ITreeCacheRepository {
    getTreeList(params: GetTreeListParams): Promise<CacheEntry<TreeListResult> | null>;
    getTreeInfo(id: string): Promise<CacheEntry<TreeInfo> | null>;
    saveTreeList(params: GetTreeListParams, data: TreeListResult): Promise<void>;
    saveTreeDetail(id: string, data: TreeInfo): Promise<void>;
    clearAll(): Promise<void>;
    clearTreeList(params: GetTreeListParams): Promise<void>;
    clearTreeDetail(id: string): Promise<void>;
}

export const TreeCacheRepositoryKey = "TreeCacheRepositoryKey";