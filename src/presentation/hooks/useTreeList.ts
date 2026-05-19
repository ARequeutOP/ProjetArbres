import { useContext, useState } from "react";
import { TreeRepositoryContext } from "../context/TreeRepositoryContext";

import { Tree } from "@/src/domain/entities/Tree";

export const useTreeList = () => {
  const repository = useContext(TreeRepositoryContext);
  const [treeList, setTreeList] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  
  const fetchTrees = async () => {
    setError(null);
    setIsLoading(true);
    let numberTreesLoaded = treeList.length;
    try {
      const data = await repository.getTreeList(numberTreesLoaded);
      setTreeList(prev => [...prev, ...data]);
    } catch(error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const loadMoreTrees = async () => {
    if (isLoading || error) return;
    fetchTrees();
  }

  const retryGetTrees = async () => {
    if (isLoading) return;
    fetchTrees();
  }

  return { treeList, isLoading, loadMoreTrees, retryGetTrees, error };
}
