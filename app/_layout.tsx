import { Colors } from "@/model/colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
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
}
