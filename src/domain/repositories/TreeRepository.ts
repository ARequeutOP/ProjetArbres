import { Tree, TreeInfo } from "@/src/domain/entities/Tree";

export interface ITreeRepository {
    getTreeList(numberTreesLoaded: number): Promise<Tree[]>;
    getTreeInfo(id: string): Promise<TreeInfo>;
}