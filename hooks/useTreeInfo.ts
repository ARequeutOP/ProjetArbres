import { useEffect, useState } from "react";

import { TreeInfo } from "@/model/types";

export const useTreeInfo = (id: string) => {
    const [treeInfo, setTreeInfo] = useState<TreeInfo | null>(null)
      const [isLoading, setIsLoading] = useState<boolean>(true);

    const getTreeInfo = async () => {
        setIsLoading(true);
        const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records?select=idbase%2C%20libellefrancais%2C%20adresse%2C%20espece%2C%20circonferenceencm%2C%20hauteurenm%2C%20stadedeveloppement%2C%20geo_point_2d&where=idbase%20%3D%20${id}&limit=20`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            setTreeInfo(result.results[0]);
        } catch(error) {
            console.error(error);
        } finally {
      setIsLoading(false);
        }
    }

    useEffect(()=>{getTreeInfo()},[]);
    return { treeInfo, isLoading, };
}