import { Tree, TreeInfo } from "@/src/domain/entities/Tree";
import { GetTreeListParams } from "../usecases/types/GetTreeListParams";

export interface ITreeRepository {
    getTreeList(params: GetTreeListParams): Promise<Tree[]>;
    getTreeInfo(id: string): Promise<TreeInfo>;
}