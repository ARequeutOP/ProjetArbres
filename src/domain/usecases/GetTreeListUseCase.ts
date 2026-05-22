import { CACHE_TREE_LIST_DURATION } from "@/src/framework/cache/cacheConstants";
import { ITreeCacheRepository } from "@/src/framework/repositories/ITreeCacheRepository";
import { ITreeRemoteRepository } from "@/src/framework/repositories/ITreeRemoteRepository";
import { TreeListResult } from "../../framework/models/TreeListResult";
import { GetTreeListParams } from "../../framework/query/GetTreeListParams";

export class GetTreeListUseCase {
    constructor(
        private treeRemoteRepository: ITreeRemoteRepository,
        private treeCacheRepository: ITreeCacheRepository
    ) {};
    
    async execute(params: GetTreeListParams): Promise<TreeListResult> {
        const cachedData = await this.treeCacheRepository.getTreeList(params);
        if (cachedData) {
            const isExpired = Date.now() - cachedData.metadata.savedAt > CACHE_TREE_LIST_DURATION;
            if (isExpired) {
                this.treeCacheRepository.clearTreeList(params);
            } else {
                return cachedData.data;
            }
        }
        const remoteData = await this.treeRemoteRepository.getTreeList(params);
        await this.treeCacheRepository.saveTreeList(params, remoteData);
        return remoteData;
    }
}