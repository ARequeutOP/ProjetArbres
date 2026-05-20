import { TreeInfo } from "@/src/domain/entities/Tree";
import { TreeListResult } from "../types/TreeListResult";
import { GetTreeListParams } from "../usecases/types/GetTreeListParams";

export interface ITreeRepository {
    getTreeList(params: GetTreeListParams): Promise<TreeListResult>;
    getTreeInfo(id: string): Promise<TreeInfo>;
}