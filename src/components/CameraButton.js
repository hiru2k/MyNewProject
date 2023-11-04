import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native-animatable";

export default function CameraButton({ title, onPress, icon, color }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Entypo name={icon} size={28} color={color ? color : "blue"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: 390, height: 100 },
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 200,
    marginTop: 10,
  },
});
