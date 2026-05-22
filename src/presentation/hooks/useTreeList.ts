import { SortOrder } from "@/src/framework/query/SortOrder";
import { useEffect, useState } from "react";

import { GetTreeListUseCaseKey, IGetTreeListUseCase } from "@/src/domain/GetTreeList/GetTreeListUseCase";
import { container } from "@/src/framework/di/registerDependencies";
import { Tree } from "@/src/framework/models/Tree";

export const useTreeList = () => {
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
      const data = await container.resolve<IGetTreeListUseCase>(GetTreeListUseCaseKey).execute( { numberTreesLoaded, sortOrder, searchText } );
      if (!data) return;
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
