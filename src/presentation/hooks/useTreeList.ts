import { useContext, useState } from "react";
import { TreeRepositoryContext } from "../context/TreeRepositoryContext";

import { Tree } from "@/src/domain/entities/Tree";

export const useTreeList = () => {
  const repository = useContext(TreeRepositoryContext);
  const [treeList, setTreeList] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  const getTrees = async () => {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);
    let numberTreesLoaded = treeList.length;
    try {
      const data = await repository.getTreeList(numberTreesLoaded);
      setTreeList(prev => [...prev, ...data]);
    } catch(error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }
  }  
  return { treeList, isLoading, getTrees, error };
}
