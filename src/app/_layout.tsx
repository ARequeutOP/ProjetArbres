import { TreeUseCaseContext } from "@/src/presentation/context/TreeUseCasesContext";
import { Stack } from "expo-router";
import { Colors } from "../presentation/colors";

import { TreeRemoteRepositoryImpl } from "@/src/data/repositories/TreeRemoteRepositoryImpl";

import { TreeCacheRepositoryImpl } from "../data/repositories/TreeCacheRepositoryImpl";
import { GetTreeInfoUseCase } from "../domain/usecases/GetTreeInfoUseCase";
import { GetTreeListUseCase } from "../domain/usecases/GetTreeListUseCase";

import { AsyncTreeStorageCacheDatasource } from "../data/datasources/AsyncStorageTreeCacheDatasource";

import { TreeApiDatasource } from "../data/datasources/TreeApiDatasource";
const remoteDatasource = new TreeApiDatasource();

// import { MockTreeDatasource } from "../data/datasources/MockTreeDatasource";
// const remoteDatasource = new MockTreeDatasource();

const cacheDatasource = new AsyncTreeStorageCacheDatasource();
const remoteRepository = new TreeRemoteRepositoryImpl(remoteDatasource);
const cacheRepository = new TreeCacheRepositoryImpl(cacheDatasource);
const getTreeListUseCase = new GetTreeListUseCase(remoteRepository, cacheRepository);
const getTreeInfoUseCase = new GetTreeInfoUseCase(remoteRepository, cacheRepository);

export default function RootLayout() {
  return (
    <TreeUseCaseContext.Provider value={{getTreeListUseCase, getTreeInfoUseCase}}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.background,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} >        
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="tree-detail" options={{ title: "Tree" }} />
      </Stack>
    </TreeUseCaseContext.Provider>
  )
}
