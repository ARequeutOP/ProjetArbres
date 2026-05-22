import { CACHE_TREE_LIST_DURATION } from "@/src/framework/cache/cacheConstants";
import { container } from "@/src/framework/di/registerDependencies";
import { ITreeCacheRepository, TreeCacheRepositoryKey } from "@/src/framework/repositories/ITreeCacheRepository";
import { ITreeRemoteRepository, TreeRemoteRepositoryKey } from "@/src/framework/repositories/ITreeRemoteRepository";
import { TreeListResult } from "../../framework/models/TreeListResult";
import { GetTreeListParams } from "../../framework/query/GetTreeListParams";
import { IGetTreeListUseCase } from "./GetTreeListUseCase";

export const GetTreeListUseCaseImpl: IGetTreeListUseCase = { 
    async execute(params: GetTreeListParams): Promise<TreeListResult> {
        const treeCacheRepository = container.resolve<ITreeCacheRepository>(TreeCacheRepositoryKey);
        const treeRemoteRepository = container.resolve<ITreeRemoteRepository>(TreeRemoteRepositoryKey);
        const cachedData = await treeCacheRepository.getTreeList(params);
        if (cachedData) {
            const isExpired = Date.now() - cachedData.metadata.savedAt > CACHE_TREE_LIST_DURATION;
            if (isExpired) {
                await treeCacheRepository.clearTreeList(params);
            } else {
                return cachedData.data;
            }
        }
        const remoteData = await treeRemoteRepository.getTreeList(params);
        await treeCacheRepository.saveTreeList(params, remoteData);
        return remoteData;
    }
}