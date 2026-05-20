import { MOCK_API_ERROR, MOCK_DELAY, MOCK_NETWORK_ERROR, MOCK_TIMEOUT, MOCK_TREE_NOT_FOUND_ERROR } from "@/src/config/mock";
import { ApiError } from "@/src/core/errors/ApiError";
import { NetworkError } from "@/src/core/errors/NetworkError";
import { TimeoutError } from "@/src/core/errors/TimeoutError";
import { ApiResponseDto } from "../dto/ApiResponseDto";
import { TreeDetailDto } from "../dto/TreeDetailDto";
import { TreeListItemDto } from "../dto/TreeListItemDto";
import { TreeQueryParams } from "../dto/TreeQueryParams";
import { ITreeDataSource } from "./ITreeDataSource";

const MOCK_TREE_INFO = {
    idbase: 1,
    libellefrancais: "Pommier",
    espece: "Reinette du Mans",
    adresse: "Paris",
    circonferenceencm: 40,
    hauteurenm: 3,
    stadedeveloppement: "Jeune",
    geo_point_2d: {
        "lon":2.38,
        "lat":48.83
    }
}

const MOCK_TREE_LIST = [
    {
        idbase: 1,
        libellefrancais: "Pommier",
        espece: "Reinette du Mans",
    }, {
        idbase: 2,
        libellefrancais: "Pommier",
        espece: "Rubinette",
        }
];

export class MockTreeDatasource implements ITreeDataSource {

    async fetchTreeById(id: string): Promise<ApiResponseDto<TreeDetailDto>> { 
        await this.simulateDelay(MOCK_DELAY);       
        if (MOCK_NETWORK_ERROR) throw new NetworkError();
        if (MOCK_TIMEOUT) throw new TimeoutError();
        if (MOCK_API_ERROR) throw new ApiError("Tree Not Found", 404);
        if (MOCK_TREE_NOT_FOUND_ERROR) {
            return {
                total_count: 0,
                results: [],
            }
        };
        return {
            total_count: 1,
            results: [MOCK_TREE_INFO],
        };
    }

    async fetchTrees(queryParams: TreeQueryParams): Promise<ApiResponseDto<TreeListItemDto>>  {
        await this.simulateDelay(MOCK_DELAY);
        if (MOCK_NETWORK_ERROR) throw new NetworkError();
        if (MOCK_TIMEOUT) throw new TimeoutError();
        if (MOCK_API_ERROR) throw new ApiError("Tree Not Found", 404);
        return {
            total_count: 2,
            results: MOCK_TREE_LIST,
        };
    }

    private async simulateDelay(delay: number) {
        await new Promise(resolve => setTimeout(resolve, delay)
    );
}
}

