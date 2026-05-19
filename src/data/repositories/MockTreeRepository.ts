import { MOCK_API_ERROR, MOCK_NETWORK_ERROR, MOCK_TIMEOUT } from "@/src/config/mock";
import { ApiError } from "@/src/core/errors/ApiError";
import { NetworkError } from "@/src/core/errors/NetworkError";
import { TimeoutError } from "@/src/core/errors/TimeoutError";
import { ITreeRepository } from "@/src/domain/repositories/TreeRepository";

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

export class MockTreeRepository implements ITreeRepository {
    async getTreeInfo(id: string) {
        if (MOCK_NETWORK_ERROR) throw new NetworkError();
        if (MOCK_TIMEOUT) throw new TimeoutError();
        if (MOCK_API_ERROR) throw new ApiError("Tree Not Found", 404);
        return MOCK_TREE_INFO;
    }
    async getTreeList(numberTreesLoaded: number) {
        if (MOCK_NETWORK_ERROR) throw new NetworkError();
        if (MOCK_TIMEOUT) throw new TimeoutError();
        if (MOCK_API_ERROR) throw new ApiError("API not found", 404);
        return MOCK_TREE_LIST;
    }
}