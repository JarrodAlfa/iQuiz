import { Stack } from "expo-router";
import Header from "./header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  )
}
