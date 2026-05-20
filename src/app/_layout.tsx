import { Colors } from "@/src/core/colors";
import { TreeRepositoryContext } from "@/src/presentation/context/TreeRepositoryContext";
import { Stack } from "expo-router";

import { TreeRepositoryImpl } from "@/src/data/repositories/TreeRepositoryImpl";

import { TreeApiDatasource } from "../data/datasources/TreeApiDatasource";
const datasource = new TreeApiDatasource();

// import { MockTreeDatasource } from "../data/datasources/MockTreeDatasource";
// const datasource = new MockTreeDatasource

const repository = new TreeRepositoryImpl(datasource);

export default function RootLayout() {
  return (
    <TreeRepositoryContext.Provider value={repository}>
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
    </TreeRepositoryContext.Provider>
  )
}
