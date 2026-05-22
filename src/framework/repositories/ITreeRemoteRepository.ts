import { TreeInfo } from "../models/TreeInfo";
import { TreeListResult } from "../models/TreeListResult";
import { GetTreeListParams } from "../query/GetTreeListParams";

export interface ITreeRemoteRepository {
    getTreeList(params: GetTreeListParams): Promise<TreeListResult>;
    getTreeInfo(id: string): Promise<TreeInfo>;
}