import { ApiError } from "@/src/core/errors/ApiError";
import { fetchWithTimeout } from "@/src/data/fetchWithTimeout";
import { SortOrder } from "@/src/domain/usecases/types/GetTreeListParams";
import { ApiResponseDto } from "../dto/ApiResponseDto";
import { TreeDetailDto } from "../dto/TreeDetailDto";
import { TreeListItemDto } from "../dto/TreeListItemDto";
import { TreeQueryParams } from "../dto/TreeQueryParams";
import { ITreeDataSource } from "./ITreeDataSource";

export class TreeApiDatasource implements ITreeDataSource {
    async fetchTreeById(id: string): Promise<ApiResponseDto<TreeDetailDto>> {
        const url =
            `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records`+
            `?select=idbase%2C%20libellefrancais%2C%20adresse%2C%20espece%2C%20circonferenceencm%2C%20hauteurenm%2C%20stadedeveloppement%2C%20geo_point_2d`+
            `&where=idbase%20%3D%20${id}`+
            `&limit=1`;
        const response = await fetchWithTimeout(url, 5000);
        if (!response.ok) {
            throw new ApiError("API Request Failed", response.status);
        }
        const result: ApiResponseDto<TreeDetailDto> = await response.json();
        return result
    }
    async fetchTrees(queryParams: TreeQueryParams): Promise<ApiResponseDto<TreeListItemDto>>  {

        let orderUrlString = "";
        switch (queryParams.sortOrder) {
            case (SortOrder.ASC):
                orderUrlString = "&order_by=libellefrancais%20asc";
                break;
            case (SortOrder.DESC):
                orderUrlString = "&order_by=libellefrancais%20desc";
                break;
        }

        const offsetUrlString =
            queryParams.offset !== undefined
            ? `&offset=${queryParams.offset}`
            : "";

        const url =
            `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records`+
            `?select=idbase%2C%20libellefrancais%2C%20espece`+
            `&limit=${queryParams.limit}`+
            `${orderUrlString}`+
            `${offsetUrlString}`;
        
        const response = await fetchWithTimeout(url, 5000);
        if (!response.ok) {
            throw new ApiError("API Request Failed", response.status);
        }
        const result: ApiResponseDto<TreeListItemDto> = await response.json();
        return result;
    }
}