// ============================================================
// app/_layout.tsx  (RootLayout)
// AuthProvider sarıyor. isLoggedIn'e göre yönlendiriyor.
// ============================================================
import { AuthProvider, useAuth } from "../services/AuthContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/src/utils/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

// Auth guard: giriş yapılmamışsa login'e, yapılmışsa tabs'a yönlendirir
function AuthGate() {
  const { isLoggedIn, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = (segments[0] as string) === "login" || (segments[0] as string) === "register";

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/login" as any);
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/(tabs)" as any);
    }
  }, [isLoggedIn, isLoading, segments]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthGate />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
