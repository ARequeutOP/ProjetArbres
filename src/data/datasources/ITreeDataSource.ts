import { ApiResponseDto } from "../dto/ApiResponseDto";
import { TreeDetailDto } from "../dto/TreeDetailDto";
import { TreeListItemDto } from "../dto/TreeListItemDto";
import { TreeQueryParams } from "../dto/TreeQueryParams";

export interface ITreeDataSource {
    fetchTrees(queryParams: TreeQueryParams): Promise<ApiResponseDto<TreeListItemDto>>;
    fetchTreeById(id: string): Promise<ApiResponseDto<TreeDetailDto>>;
}