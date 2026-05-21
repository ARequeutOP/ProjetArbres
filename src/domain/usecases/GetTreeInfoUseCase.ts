import { CACHE_TREE_INFO_DURATION } from "@/src/core/config/constants";
import { TreeInfo } from "../entities/Tree";
import { ITreeCacheRepository } from "../repositories/ITreeCacheRepository";
import { ITreeRemoteRepository } from "../repositories/ITreeRemoteRepository";

export class GetTreeInfoUseCase {
    constructor(
        private treeRemoteRepository: ITreeRemoteRepository,
        private treeCacheRepository: ITreeCacheRepository
    ) {};
    
    async execute(id: string): Promise<TreeInfo> {
        const cachedData = await this.treeCacheRepository.getTreeInfo(id);
        if (cachedData) {
            const isExpired = Date.now() - cachedData.metadata.savedAt > CACHE_TREE_INFO_DURATION;
            if (isExpired) {
                this.treeCacheRepository.clearTreeDetail(id);
            } else {
                return cachedData.data;
            }
        }
        const remoteData = await this.treeRemoteRepository.getTreeInfo(id);
        await this.treeCacheRepository.saveTreeDetail(id, remoteData);
        return remoteData;
    }
}