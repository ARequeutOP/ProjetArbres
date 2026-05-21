import { TreeNotFoundError } from "@/src/core/errors/TreeNotFoundError";
import { TreeInfo } from "@/src/domain/entities/Tree";
import { ITreeRemoteRepository } from "@/src/domain/repositories/ITreeRemoteRepository";
import { TreeListResult } from "@/src/domain/types/TreeListResult";
import { GetTreeListParams } from "@/src/domain/usecases/types/GetTreeListParams";
import { ITreeRemoteDatasource } from "../datasources/ITreeRemoteDatasource";

export class TreeRemoteRepositoryImpl implements ITreeRemoteRepository {
    constructor(private treeRemoteDatasource: ITreeRemoteDatasource) {}

    async getTreeInfo(id: string): Promise<TreeInfo> {
        const result = await this.treeRemoteDatasource.fetchTreeById(id);
        
        if (!Array.isArray(result.results) || result.results.length === 0) {
            throw new TreeNotFoundError();
        }
        const dto = result.results[0];

        return {
            idbase: dto.idbase,
            adresse: dto.adresse ?? "",
            libellefrancais: dto.libellefrancais ?? "",
            espece: dto.espece ?? "",
            circonferenceencm: dto.circonferenceencm ?? 0,
            hauteurenm: dto.hauteurenm ?? 0,
            stadedeveloppement: dto.stadedeveloppement ?? "",
            geo_point_2d: dto.geo_point_2d ?? {
                lon: 0,
                lat: 0,
            },
        };
    }

    async getTreeList(params: GetTreeListParams): Promise<TreeListResult> {
        const result = await this.treeRemoteDatasource.fetchTrees({
            offset: params.numberTreesLoaded,
            sortOrder: params.sortOrder,
            searchText: params.searchText,
            limit: 20,
        });

        return {
            total_count: result.total_count,
            treeList: 
            result.results.map((dto) => ({
                idbase: dto.idbase,
                libellefrancais: dto.libellefrancais ?? "",
                espece: dto.espece ?? "",
            }))
        };
    }
}