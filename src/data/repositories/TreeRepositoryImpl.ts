import { TreeNotFoundError } from "@/src/core/errors/TreeNotFoundError";
import { Tree, TreeInfo } from "@/src/domain/entities/Tree";
import { ITreeRepository } from "@/src/domain/repositories/ITreeRepository";
import { GetTreeListParams } from "@/src/domain/usecases/types/GetTreeListParams";
import { ITreeDataSource } from "../datasources/ITreeDataSource";

export class TreeRepositoryImpl implements ITreeRepository {
    constructor(private treeDatasource: ITreeDataSource) {}

    async getTreeInfo(id: string): Promise<TreeInfo> {
        const result = await this.treeDatasource.fetchTreeById(id);
        
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

    async getTreeList(params: GetTreeListParams): Promise<Tree[]> {
        const result = await this.treeDatasource.fetchTrees({
            offset: params.numberTreesLoaded,
            sortOrder: params.sortOrder,
            limit: 20,
        });

        return result.results.map((dto) => ({
            idbase: dto.idbase,
            libellefrancais: dto.libellefrancais ?? "",
            espece: dto.espece ?? "",
        }));
    }
}