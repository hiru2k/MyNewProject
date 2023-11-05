import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressBar = ({ percentage, style }) => {
  return (
    <View style={[styles.progressBarContainer, style.progressBarContainer]}>
      <View
        style={[
          styles.progressBar,
          { width: `${percentage}%` },
          style.progressBar,
        ]}
      />
      <Text
        style={[
          styles.progressText,
          style.progressText,
          {
            left: `${percentage}%`, // Set the left position based on the progress
          },
        ]}
      >
        {percentage}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    backgroundColor: "#c3c3c3",
    height: 30,
    borderRadius: 10,
    width: "80%",
  },
  progressBar: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#0ed145",
  },
  progressText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default ProgressBar;
