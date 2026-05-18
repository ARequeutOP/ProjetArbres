import { ITreeRepository } from "@/src/domain/repositories/TreeRepository";
import { fetchWithTimeout } from "@/src/utils/fetchWithTimeout";
import { handleError } from "@/src/utils/handleError";

export class TreeRepositoryImpl implements ITreeRepository {
    async getTreeInfo(id: string) {
        try {
            const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records?select=idbase%2C%20libellefrancais%2C%20adresse%2C%20espece%2C%20circonferenceencm%2C%20hauteurenm%2C%20stadedeveloppement%2C%20geo_point_2d&where=idbase%20%3D%20${id}&limit=20`;
            const response = await fetchWithTimeout(url, 5000);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            if (Array.isArray(result.results) && result.results.length) return result.results[0];
            else throw new Error("Unable to get tree info");
        } catch (error) {
            handleError(error);
        }
    }
    async getTreeList(numberTreesLoaded: number) {
        try {
            const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records?select=idbase%2C%20libellefrancais%2C%20espece&limit=20&offset=${numberTreesLoaded}`;
            const response = await fetchWithTimeout(url, 5000);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            return result.results;
        } catch (error) {
            handleError(error);
        }
    }
}