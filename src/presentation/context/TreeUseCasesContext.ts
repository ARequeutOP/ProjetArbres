import { GetTreeInfoUseCase } from "@/src/domain/usecases/GetTreeInfoUseCase";
import { GetTreeListUseCase } from "@/src/domain/usecases/GetTreeListUseCase";
import { createContext } from "react";

type TreeUseCase = {
    getTreeListUseCase: GetTreeListUseCase;
    getTreeInfoUseCase: GetTreeInfoUseCase;
}

export const TreeUseCaseContext = createContext<TreeUseCase | null>(null);