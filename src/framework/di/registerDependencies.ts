import { GetTreeInfoUseCaseKey } from "@/src/domain/GetTreeInfo/GetTreeInfoUseCase";
import { GetTreeInfoUseCaseImpl } from "@/src/domain/GetTreeInfo/GetTreeInfoUseCaseImpl";
import { GetTreeListUseCaseKey } from "@/src/domain/GetTreeList/GetTreeListUseCase";
import { GetTreeListUseCaseImpl } from "@/src/domain/GetTreeList/GetTreeListUseCaseImpl";
import { AsyncTreeStorageCacheDatasource } from "../../data/datasources/AsyncStorageTreeCacheDatasource";
import { TreeApiDatasource } from "../../data/datasources/TreeApiDatasource";
import { TreeCacheRepositoryImpl } from "../../data/repositories/TreeCacheRepositoryImpl";
import { TreeRemoteRepositoryImpl } from "../../data/repositories/TreeRemoteRepositoryImpl";
import { TreeCacheDatasourceKey } from "../datasources/ITreeCacheDatasource";
import { TreeRemoteDatasourceKey } from "../datasources/ITreeRemoteDatasource";
import { TreeCacheRepositoryKey } from "../repositories/ITreeCacheRepository";
import { TreeRemoteRepositoryKey } from "../repositories/ITreeRemoteRepository";
import { DIContainer } from "./DIContainer";

export const container = new DIContainer();

// Datasources
container.register(TreeCacheDatasourceKey, AsyncTreeStorageCacheDatasource);
container.register(TreeRemoteDatasourceKey, TreeApiDatasource);

// Repositories
container.register(TreeCacheRepositoryKey, TreeCacheRepositoryImpl);
container.register(TreeRemoteRepositoryKey, TreeRemoteRepositoryImpl);

// Usecases
container.register(GetTreeInfoUseCaseKey, GetTreeInfoUseCaseImpl);
container.register(GetTreeListUseCaseKey, GetTreeListUseCaseImpl);