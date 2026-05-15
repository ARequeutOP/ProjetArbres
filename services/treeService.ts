import { Tree, TreeInfo } from "@/model/types";

export type TreeService = {
  getTreeList:  (numberTreesLoaded: number) => Promise<Tree[]>;
  getTreeInfo:  (id: string) => Promise<TreeInfo>;
}