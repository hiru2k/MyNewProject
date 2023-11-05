import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SinhalaWordSelector from "./src/screens/sinhala/SinhalaWordSelector";
import SinhalaWordDrawer from "./src/screens/sinhala/SinhalaWordDrawer";
import SinhalaImageDrawer from "./src/screens/sinhala/SinhalaImageDrawer";
import EnglishWordSelector from "./src/screens/english/EnglishWordSelector";
import EnglishWordDrawer from "./src/screens/english/EnglishWordDrawer";
import EnglishImageDrawer from "./src/screens/english/EnglishImageDrawer";
import Home from "./src/screens/Home";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SinhalaImageDrawer"
          component={SinhalaImageDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SinhalaWordSelector"
          component={SinhalaWordSelector}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SinhalaWordDrawer"
          component={SinhalaWordDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnglishImageDrawer"
          component={EnglishImageDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnglishWordSelector"
          component={EnglishWordSelector}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnglishWordDrawer"
          component={EnglishWordDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
