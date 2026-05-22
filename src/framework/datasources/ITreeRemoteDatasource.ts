import { ApiResponseDto } from "../dto/ApiResponseDto";
import { TreeDetailDto } from "../dto/TreeDetailDto";
import { TreeListItemDto } from "../dto/TreeListItemDto";
import { TreeQueryParams } from "../query/TreeQueryParams";

export interface ITreeRemoteDatasource {
    fetchTrees(queryParams: TreeQueryParams): Promise<ApiResponseDto<TreeListItemDto>>;
    fetchTreeById(id: string): Promise<ApiResponseDto<TreeDetailDto>>;
}