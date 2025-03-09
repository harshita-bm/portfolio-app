import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // ✅ Corrected font import (without expo-asset)
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"), // ✅ Correct syntax
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          headerShown: false, // Hide headers for all screens
          tabBarStyle: { backgroundColor: "#222" }, // Optional: Custom tab bar style
        }}
      >
        {/* Main Page */}
        <Tabs.Screen name="index" options={{ title: "Home" }} />

        {/* Other Pages in Tabs */}
        <Tabs.Screen name="about" options={{ title: "About" }} />
        <Tabs.Screen name="resume" options={{ title: "Resume" }} />
        <Tabs.Screen name="projects" options={{ title: "Projects" }} />
        <Tabs.Screen name="hobbies" options={{ title: "Hobbies" }} />
      </Tabs>

      {/* Status Bar */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
