import { SortOrder } from "@/src/domain/usecases/types/GetTreeListParams";
import { useContext, useEffect, useState } from "react";
import { TreeUseCaseContext } from "../context/TreeUseCasesContext";

import { Tree } from "@/src/domain/entities/Tree";

export const useTreeList = () => {
  const useCases = useContext(TreeUseCaseContext);
  const [treeList, setTreeList] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DEFAULT);
  const [searchText, setSearchText] = useState<string>("");
  const [hasLoadedOnce, setHasLoadedOnce] = useState<boolean>(false);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);
  
  const fetchTrees = async (numberTreesLoaded: number, replace: boolean) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await useCases?.getTreeListUseCase.execute( { numberTreesLoaded, sortOrder, searchText } );
      const newLength = replace ? data?.treeList.length : treeList.length + data.treeList.length;
      setHasReachedEnd(newLength >= data.total_count);
      if (replace) {
        setTreeList(data.treeList);
       } else {
        setTreeList(prev => [...prev, ...data.treeList]);
      }
    } catch(error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const loadMoreTrees = async () => {
    if (!hasLoadedOnce || hasReachedEnd || isLoading || error) return;
    fetchTrees(treeList.length, false);
  }

  const retryGetTrees = async () => {
    if (isLoading) return;
    fetchTrees(treeList.length, false);
  }

  const updateSortOrder = () => {
        if (sortOrder === SortOrder.ASC) {
            setSortOrder(SortOrder.DESC);
        } else {
            setSortOrder(SortOrder.ASC);
        }
    }

  const refresh = () => {
      fetchTrees(0, true);
    }

  useEffect(() => {
      refresh();
      setHasLoadedOnce(true);
    }, [sortOrder, searchText]);

  return { treeList, isLoading, sortOrder, updateSortOrder, setSearchText, loadMoreTrees, retryGetTrees, error };
}
