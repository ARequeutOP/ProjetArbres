import { TreeListResult } from "@/src/framework/models/TreeListResult";
import { GetTreeListParams } from "@/src/framework/query/GetTreeListParams";
import { IBaseUseCase } from "../IBaseUseCase";

export type IGetTreeListUseCase = IBaseUseCase<GetTreeListParams, TreeListResult>;

export const GetTreeListUseCaseKey = "GetTreeListUseCaseKey";