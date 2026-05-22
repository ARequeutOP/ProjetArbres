import { TreeInfo } from "@/src/framework/models/TreeInfo";
import { IBaseUseCase } from "../IBaseUseCase";

export type IGetTreeInfoUseCase = IBaseUseCase<{id: string}, TreeInfo>;

export const GetTreeInfoUseCaseKey = "GetTreeInfoUseCaseKey";