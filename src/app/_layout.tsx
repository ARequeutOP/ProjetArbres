import { Colors } from "@/src/colors";
import { TreeRepositoryContext } from "@/src/presentation/context/TreeRepositoryContext";
import { Stack } from "expo-router";

import { TreeRepositoryImpl } from "@/src/data/repositories/TreeRepositoryImpl";
const repository = new TreeRepositoryImpl();

// import { MockTreeRepository } from "@/data/repositories/MockTreeRepository";
// const repository = new MockTreeRepository();

export default function RootLayout() {
  return (
    <TreeRepositoryContext value={repository}>
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
    </TreeRepositoryContext>
  )
}
