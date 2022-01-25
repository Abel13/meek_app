import React, { useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

// import { useAuthStore } from "../store/auth";
// import api from "../services/api";

import {
  // Login,
  // Register,
  // PractitionerRegister,
  // MotherRegister,
  Game,
} from "../components/pages";

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="HomeRoutes" component={Game} />
    </Navigator>
  );
}
