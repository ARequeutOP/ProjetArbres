import { MOCK_API_ERROR, MOCK_DELAY, MOCK_NETWORK_ERROR, MOCK_TIMEOUT, MOCK_TREE_NOT_FOUND_ERROR } from "@/src/framework/config/mock";
import { ITreeRemoteDatasource } from "@/src/framework/datasources/ITreeRemoteDatasource";
import { ApiError } from "@/src/framework/errors/ApiError";
import { NetworkError } from "@/src/framework/errors/NetworkError";
import { TimeoutError } from "@/src/framework/errors/TimeoutError";
import { ApiResponseDto } from "../../framework/dto/ApiResponseDto";
import { TreeDetailDto } from "../../framework/dto/TreeDetailDto";
import { TreeListItemDto } from "../../framework/dto/TreeListItemDto";
import { TreeQueryParams } from "../../framework/query/TreeQueryParams";
import { simulateDelay } from "../utils/simulateDelay";

const MOCK_TREE_INFO = {
    idbase: 1,
    libellefrancais: "Pommier",
    espece: "Reinette du Mans",
    adresse: "Paris",
    circonferenceencm: 50,
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
        geo_point_2d: {
            "lon":2.38,
            "lat":48.83
        }
    }, {
        idbase: 2,
        libellefrancais: "Pommier",
        espece: "Rubinette",
        geo_point_2d: {
            "lon":2.38,
            "lat":48.83
        }
        }
];

export const MockTreeDatasource: ITreeRemoteDatasource = {
    async fetchTreeById(id: string): Promise<ApiResponseDto<TreeDetailDto>> { 
        await simulateDelay(MOCK_DELAY);       
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
    },
    async fetchTrees(queryParams: TreeQueryParams): Promise<ApiResponseDto<TreeListItemDto>>  {
        await simulateDelay(MOCK_DELAY);
        if (MOCK_NETWORK_ERROR) throw new NetworkError();
        if (MOCK_TIMEOUT) throw new TimeoutError();
        if (MOCK_API_ERROR) throw new ApiError("Tree Not Found", 404);
        return {
            total_count: 2,
            results: MOCK_TREE_LIST,
        };
    },
}

