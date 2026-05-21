import { CACHE_TREE_LIST_DURATION } from "@/src/core/config/constants";
import { ITreeCacheRepository } from "../repositories/ITreeCacheRepository";
import { ITreeRemoteRepository } from "../repositories/ITreeRemoteRepository";
import { TreeListResult } from "../types/TreeListResult";
import { GetTreeListParams } from "./types/GetTreeListParams";

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