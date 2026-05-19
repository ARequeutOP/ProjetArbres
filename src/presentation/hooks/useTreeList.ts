import { SortOrder } from "@/src/domain/usecases/types/GetTreeListParams";
import { useContext, useState } from "react";
import { TreeRepositoryContext } from "../context/TreeRepositoryContext";

import { Tree } from "@/src/domain/entities/Tree";

export const useTreeList = () => {
  const repository = useContext(TreeRepositoryContext);
  const [treeList, setTreeList] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DEFAULT)
  
  const fetchTrees = async () => {
    setError(null);
    setIsLoading(true);
    let numberTreesLoaded = treeList.length;
    try {
      const data = await repository.getTreeList( { numberTreesLoaded, sortOrder } );
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

  const updateSortOrder = () => {
        setTreeList([]);
        if (sortOrder === SortOrder.ASC) {
            setSortOrder(SortOrder.DESC);
        } else {
            setSortOrder(SortOrder.ASC);
        }
    }

  return { treeList, isLoading, sortOrder, updateSortOrder, loadMoreTrees, retryGetTrees, error };
}
