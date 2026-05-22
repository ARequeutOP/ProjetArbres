import { CACHE_TREE_INFO_DURATION } from "@/src/framework/cache/cacheConstants";
import { TreeInfo } from "@/src/framework/models/TreeInfo";
import { ITreeCacheRepository, TreeCacheRepositoryKey } from "@/src/framework/repositories/ITreeCacheRepository";
import { ITreeRemoteRepository, TreeRemoteRepositoryKey } from "@/src/framework/repositories/ITreeRemoteRepository";
import { IGetTreeInfoUseCase } from "./GetTreeInfoUseCase";

import { container } from "@/src/framework/di/registerDependencies";

export const GetTreeInfoUseCaseImpl: IGetTreeInfoUseCase = {
    async execute(params: {id: string}): Promise<TreeInfo> {
        const treeCacheRepository = container.resolve<ITreeCacheRepository>(TreeCacheRepositoryKey);
        const treeRemoteRepository = container.resolve<ITreeRemoteRepository>(TreeRemoteRepositoryKey);
        
        const cachedData = await treeCacheRepository.getTreeInfo(params.id);
        if (cachedData) {
            const isExpired = Date.now() - cachedData.metadata.savedAt > CACHE_TREE_INFO_DURATION;
            if (isExpired) {
                await treeCacheRepository.clearTreeDetail(params.id);
            } else {
                return cachedData.data;
            }
        }
        const remoteData = await treeRemoteRepository.getTreeInfo(params.id);
        await treeCacheRepository.saveTreeDetail(params.id, remoteData);
        return remoteData;
    }
}