import { TreeServiceContext } from "@/services/treeServiceContext";
import { useContext, useState } from "react";

import { Tree } from "@/model/types";

export const useTreeList = () => {
  const service = useContext(TreeServiceContext);
  const [treeList, setTreeList] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  const getTrees = async () => {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);
    let numberTreesLoaded = treeList.length;
    try {
      const data = await service.getTreeList(numberTreesLoaded);
      setTreeList(prev => [...prev, ...data]);
    } catch(error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }
  }  
  return { treeList, isLoading, getTrees, error };
}
