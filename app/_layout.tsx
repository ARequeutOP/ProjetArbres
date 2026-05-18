import { Colors } from "@/model/colors";
// import { mockTreeService } from "@/services/mockTreeService";
import { TreeServiceContext } from "@/services/treeServiceContext";
import { treeServiceImpl } from "@/services/treeServiceImpl";
import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <TreeServiceContext value={treeServiceImpl}>
    {/* <TreeServiceContext value={mockTreeService}> */}
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
    </TreeServiceContext>
  )
}
