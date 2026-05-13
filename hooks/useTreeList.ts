import { useState } from "react";

import { Tree } from "@/model/types";

export const useTreeList = () => {
  const [treeList, setTreeList] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const getTrees = async () => {
    if (isLoading) return;
    setIsLoading(true);
    let numberTreesLoaded = treeList.length;
    const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records?select=idbase%2C%20libellefrancais%2C%20espece&limit=20&offset=${numberTreesLoaded}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setTreeList(prev => [...prev, ...result.results]);
    } catch(error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }  
  return { treeList, isLoading, getTrees };
}
