import React from "react";
import { View, SafeAreaView } from "react-native";
import Portfolio from "@/components/Portfolio"; // Ensure the correct path

export default function PortfolioScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1 }}>
        <Portfolio />
      </View>
    </SafeAreaView>
  );
}
