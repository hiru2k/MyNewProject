import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const navigateSinhalaSection = () => {
    navigation.navigate("SinhalaWordSelector");
  };
  const navigateEnglishSection = () => {
    navigation.navigate("EnglishWordSelector");
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.HomeButton}
          onPress={navigateSinhalaSection}
        >
          <Text style={styles.buttonText}>සිංහල</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.HomeButton}
          onPress={navigateEnglishSection}
        >
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },

  HomeButton: {
    marginTop: -70,
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
    color: "white",
    fontColor: "white",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Home;
