import { ApiError } from "@/src/core/errors/ApiError";
import { fetchWithTimeout } from "@/src/data/fetchWithTimeout";
import { ITreeRepository } from "@/src/domain/repositories/TreeRepository";
import { GetTreeListParams, SortOrder } from "@/src/domain/usecases/types/GetTreeListParams";

export class TreeRepositoryImpl implements ITreeRepository {
    async getTreeInfo(id: string) {
        const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records?select=idbase%2C%20libellefrancais%2C%20adresse%2C%20espece%2C%20circonferenceencm%2C%20hauteurenm%2C%20stadedeveloppement%2C%20geo_point_2d&where=idbase%20%3D%20${id}&limit=20`;
        const response = await fetchWithTimeout(url, 5000);
        if (!response.ok) {
            throw new ApiError("API Request Failed", response.status);
        }
        const result = await response.json();
        if (Array.isArray(result.results) && result.results.length) {
            return result.results[0];
        }
        throw new ApiError("Tree Not Found", 404);
    }
    async getTreeList(params: GetTreeListParams) {
        let orderUrlString = "";
        switch (params.sortOrder) {
            case (SortOrder.ASC):
                orderUrlString = "order_by=libellefrancais%20asc&";
                break;
            case (SortOrder.DESC):
                orderUrlString = "order_by=libellefrancais%20desc&";
                break;
        }
        const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records?select=idbase%2C%20libellefrancais%2C%20espece&limit=20&${orderUrlString}offset=${params.numberTreesLoaded}`;
        const response = await fetchWithTimeout(url, 5000);
        if (!response.ok) {
            throw new ApiError("API Request Failed", response.status);
        }
        const result = await response.json();
        return result.results;
    }
}