import { CacheEntry } from "@/src/data/types/CacheEntry";
import { TreeInfo } from "@/src/domain/entities/Tree";
import { TreeListResult } from "../types/TreeListResult";
import { GetTreeListParams } from "../usecases/types/GetTreeListParams";

export interface ITreeCacheRepository {
    getTreeList(params: GetTreeListParams): Promise<CacheEntry<TreeListResult> | null>;
    getTreeInfo(id: string): Promise<CacheEntry<TreeInfo> | null>;
    saveTreeList(params: GetTreeListParams, data: TreeListResult): Promise<void>;
    saveTreeDetail(id: string, data: TreeInfo): Promise<void>;
    clearAll(): Promise<void>;
    clearTreeList(params: GetTreeListParams): Promise<void>;
    clearTreeDetail(id: string): Promise<void>;
}