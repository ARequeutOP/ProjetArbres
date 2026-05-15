import { useEffect, useState } from "react";

import { TreeInfo } from "@/model/types";
import { service } from "@/services";

export const useTreeInfo = (id: string) => {
    const [treeInfo, setTreeInfo] = useState<TreeInfo | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const getTreeInfo = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await service.getTreeInfo(id);
            setTreeInfo(data);
        } catch(error) {
            if (error instanceof Error) setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{getTreeInfo()},[]);
    return { treeInfo, isLoading, error};
}