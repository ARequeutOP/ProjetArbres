import { useContext, useEffect, useState } from "react";

import { TreeInfo } from "@/src/framework/models/TreeInfo";
import { TreeUseCaseContext } from "../context/TreeUseCasesContext";
export const useTreeInfo = (id: string) => {
    const useCases = useContext(TreeUseCaseContext);
    const [treeInfo, setTreeInfo] = useState<TreeInfo | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const getTreeInfo = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await useCases?.getTreeInfoUseCase.execute(id);
            if (!data) return;
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