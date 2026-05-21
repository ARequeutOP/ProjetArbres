import { TreeInfo } from "@/src/domain/entities/Tree";
import { TreeListResult } from "../types/TreeListResult";
import { GetTreeListParams } from "../usecases/types/GetTreeListParams";

export interface ITreeCacheRepository {
    getTreeList(params: GetTreeListParams): Promise<TreeListResult | null>;
    getTreeInfo(id: string): Promise<TreeInfo | null>;
    saveTreeList(params: GetTreeListParams, data: TreeListResult): Promise<void>;
    saveTreeDetail(id: string, data: TreeInfo): Promise<void>;
    clearAll(): Promise<void>;
    clearTreeList(params: GetTreeListParams): Promise<void>;
    clearTreeDetail(id: string): Promise<void>;
}