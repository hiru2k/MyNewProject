import React from "react";
import { View, StyleSheet } from "react-native";
import WordSelector from "./src/screens/WordSelector";
import WordDrawer from "./src/screens/WordDrawer";
import ImageDrawer from "./src/screens/ImageDrawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WordSelector">
        <Stack.Screen
          name="ImageDrawer"
          component={ImageDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WordSelector"
          component={WordSelector}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WordDrawer"
          component={WordDrawer}
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
