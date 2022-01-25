import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/app.routes";

import theme from "./src/global/styles/theme";

const fetchFonts = () => {
  return Font.loadAsync({
    "Barlow Condensed Black": require("./assets/fonts/BarlowCondensed-Black.ttf"),
    "Barlow Condensed Black Italic": require("./assets/fonts/BarlowCondensed-BlackItalic.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <ThemeProvider value={theme}>
      <NavigationContainer>
        <AppRoutes />
        <StatusBar style="auto" />
      </NavigationContainer>
    </ThemeProvider>
  );
}
