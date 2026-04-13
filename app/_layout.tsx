import { Stack } from "expo-router";
import Header from "./header";
import { StatsProvider } from "./StatsContext";

export default function RootLayout() {
  return (
    <StatsProvider>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </StatsProvider>
  )
}
