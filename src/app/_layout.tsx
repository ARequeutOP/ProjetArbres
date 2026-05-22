import { Stack } from "expo-router";
import { Colors } from "../presentation/colors";

export default function RootLayout() {
  // Clear Cache
  // container.resolve<ITreeCacheDatasource>(TreeCacheDatasourceKey).clearAll();
  return (
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
  )
}
