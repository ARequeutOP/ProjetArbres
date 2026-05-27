import { ITreeRemoteDatasource, TreeRemoteDatasourceKey } from "@/src/framework/datasources/ITreeRemoteDatasource";
import { container } from "@/src/framework/di/registerDependencies";
import { TreeNotFoundError } from "@/src/framework/errors/TreeNotFoundError";
import { TreeInfo } from "@/src/framework/models/TreeInfo";
import { TreeListResult } from "@/src/framework/models/TreeListResult";
import { GetTreeListParams } from "@/src/framework/query/GetTreeListParams";
import { ITreeRemoteRepository } from "@/src/framework/repositories/ITreeRemoteRepository";

export const TreeRemoteRepositoryImpl: ITreeRemoteRepository = {
    async getTreeInfo(id: string): Promise<TreeInfo> {
        const treeRemoteDatasource = container.resolve<ITreeRemoteDatasource>(TreeRemoteDatasourceKey)
        const result = await treeRemoteDatasource.fetchTreeById(id);
        
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
    },

    async getTreeList(params: GetTreeListParams): Promise<TreeListResult> {
        const treeRemoteDatasource = container.resolve<ITreeRemoteDatasource>(TreeRemoteDatasourceKey)
        const result = await treeRemoteDatasource.fetchTrees({
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
                geo_point_2d: dto.geo_point_2d ?? {
                    lon: 0,
                    lat: 0,
                },
            }))
        };
    },
}