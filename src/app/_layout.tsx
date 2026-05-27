import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ITreeCacheDatasource, TreeCacheDatasourceKey } from "../framework/datasources/ITreeCacheDatasource";
import { container } from "../framework/di/registerDependencies";
import { Colors } from "../presentation/colors";

export default function RootLayout() {
  // Clear Cache
  container.resolve<ITreeCacheDatasource>(TreeCacheDatasourceKey).clearAll();
  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  )
}
