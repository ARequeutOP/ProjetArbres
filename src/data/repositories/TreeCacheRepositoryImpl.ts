import { ITreeCacheDatasource } from "@/src/framework/datasources/ITreeCacheDatasource";
import { TreeInfo } from "@/src/framework/models/TreeInfo";
import { TreeListResult } from "@/src/framework/models/TreeListResult";
import { GetTreeListParams } from "@/src/framework/query/GetTreeListParams";
import { ITreeCacheRepository } from "@/src/framework/repositories/ITreeCacheRepository";
import { CacheEntry } from "../../framework/cache/CacheEntry";
import { toTreeQueryParams } from "../mappers/toTreeQueryParams";

export class TreeCacheRepositoryImpl implements ITreeCacheRepository {
    constructor(private treeCacheDatasource: ITreeCacheDatasource) {}
    saveTreeList(params: GetTreeListParams, data: TreeListResult): Promise<void> {
        const dto = {
            total_count: data.total_count,
            results: data.treeList.map((tree) => ({
                idbase: tree.idbase,
                libellefrancais: tree.libellefrancais,
                espece: tree.espece,
            })),
        };
        const queryParams = toTreeQueryParams(params);
        return this.treeCacheDatasource.saveTreeList(queryParams, dto);
    }
    saveTreeDetail(id: string, data: TreeInfo): Promise<void> {
        const dto = {
            total_count: 1,
            results: [{
                idbase: data.idbase,
                libellefrancais: data.libellefrancais,
                espece: data.espece,
                adresse: data.adresse,
                circonferenceencm: data.circonferenceencm,
                hauteurenm: data.hauteurenm,
                stadedeveloppement: data.stadedeveloppement,
                geo_point_2d: {
                    lon: data.geo_point_2d.lon,
                    lat: data.geo_point_2d.lat,
                },
            }]
        };
        return this.treeCacheDatasource.saveTreeDetail(id, dto);
    }
    clearAll(): Promise<void> {
        return this.treeCacheDatasource.clearAll();
    }
    clearTreeList(params: GetTreeListParams): Promise<void> {
        const queryParams = toTreeQueryParams(params)
        return this.treeCacheDatasource.clearTreeList(queryParams);
    }
    clearTreeDetail(id: string): Promise<void> {
        return this.treeCacheDatasource.clearTreeDetail(id);
    }

    async getTreeInfo(id: string): Promise<CacheEntry<TreeInfo> | null> {
        const result = await this.treeCacheDatasource.fetchTreeById(id);
        
        if (!result || !Array.isArray(result.data.results) || result.data.results.length === 0) {
            return null
        }
        const dto = result.data.results[0];

        return {
            metadata: result.metadata,
            data: {
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
            },
        };
    }

    async getTreeList(params: GetTreeListParams): Promise<CacheEntry<TreeListResult> | null> {
        const queryParams = toTreeQueryParams(params);
        const result = await this.treeCacheDatasource.fetchTrees(queryParams);

        if (!result) return null;

        return {
            metadata: result.metadata,
            data: {
                total_count: result.data.total_count,
                treeList: 
                result.data.results.map((dto) => ({
                    idbase: dto.idbase,
                    libellefrancais: dto.libellefrancais ?? "",
                    espece: dto.espece ?? "",
                }))
            },
        };
    }
}