import React from "react";
import { View, StyleSheet } from "react-native";

const ColorPalette = ({ colors, totalColors }) => {
  const renderColors = () => {
    const coloredBoxes = colors.map((color, index) => (
      <View key={index} style={[styles.color, { backgroundColor: color }]} />
    ));

    const remainingGreyBoxes = Array.from(
      { length: totalColors - colors.length },
      (_, index) => (
        <View
          key={index + colors.length}
          style={[styles.color, { backgroundColor: "grey" }]}
        />
      )
    );

    return [...coloredBoxes, ...remainingGreyBoxes];
  };

  return <View style={styles.container}>{renderColors()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,

    borderRadius: 30,
  },
  color: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 360,
  },
});

export default ColorPalette;
