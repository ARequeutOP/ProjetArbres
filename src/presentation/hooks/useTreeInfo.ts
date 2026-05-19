import { useContext, useEffect, useState } from "react";

import { TreeInfo } from "@/src/domain/entities/Tree";
import { TreeRepositoryContext } from "../context/TreeRepositoryContext";

export const useTreeInfo = (id: string) => {
    const repository = useContext(TreeRepositoryContext);
    const [treeInfo, setTreeInfo] = useState<TreeInfo | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const getTreeInfo = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await repository.getTreeInfo(id);
            setTreeInfo(data);
        } catch(error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{getTreeInfo()},[id]);
    return { treeInfo, isLoading, error};
}