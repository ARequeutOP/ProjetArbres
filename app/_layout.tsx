import { Colors } from "@/colors";
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
      }} />
}
