import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Button,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import emptyTreeImage from "../../assets/empty_tree.png";
import coloredTreeImage from "../../assets/colored_tree.png";
import emptyCatImage from "../../assets/empty_cat.png";
import coloredCatImage from "../../assets/colored_cat.png";
import ProgressBar from "../../components/ProgressBar";
import ColorPalette from "../../components/ColorPalette";
import { useNavigation } from "@react-navigation/native";

const EnglishImageDrawer = ({ route }) => {
  const { word } = route.params ?? {};
  const navigation = useNavigation();
  const [isColored, setIsColored] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [showNextLevelBtn, setShowNextLevelBtn] = useState(false);

  const toggleImageColor = () => {
    setIsColored(!isColored);
    checkProgress();
    setSelectedColors([]);
  };

  const treeColors = [
    "#b97a56",
    "#0ed145",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
  ];
  const catColors = [
    "#fff200",
    "#c3c3c3",
    "#000000",
    "#ffaec8",
    "#88001b",
    "grey",
    "grey",
  ];
  const greyColors = ["grey", "grey", "grey", "grey", "grey", "grey", "grey"];

  let selectedImage;
  let colorsToDisplay;
  switch (word) {
    case "Tree":
      selectedImage = isColored ? coloredTreeImage : emptyTreeImage;
      colorsToDisplay = isColored ? greyColors : treeColors;
      break;
    case "Cat":
      selectedImage = isColored ? coloredCatImage : emptyCatImage;
      colorsToDisplay = isColored ? greyColors : catColors;
      break;
    default:
      selectedImage = isColored ? coloredTreeImage : emptyTreeImage;
      colorsToDisplay = isColored ? greyColors : treeColors;
  }

  const checkProgress = () => {
    setShowProgressBar(true);

    // Simulate progress update every second
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 50) {
          setShowNextLevelBtn(true);
          clearInterval(interval);
        }
        return prevProgress + 1; //1% for 1ms
      });
    }, 1);
  };
  useEffect(() => {
    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(interval);
    };
  }, []);

  const handleNextLevel = () => {
    navigation.navigate("EnglishWordSelector", { level: 2 });
  };

  const progressBarStyles = StyleSheet.create({
    progressBarContainer: {
      backgroundColor: "#c3c3c3",
      height: 30,
      borderRadius: 10,
      marginBottom: 100,
      marginTop: 10,
      width: "80%",
      alignSelf: "center",
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
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.BackgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={toggleImageColor}>
            <View>
              <Image style={styles.image} source={selectedImage} />
            </View>
          </TouchableWithoutFeedback>
          <ColorPalette colors={colorsToDisplay} totalColors={3} />
        </View>
      </View>
      {showProgressBar && isColored && (
        <ProgressBar percentage={progress} style={progressBarStyles} />
      )}
      {showNextLevelBtn && isColored && (
        <TouchableOpacity
          style={styles.nextLevelButton}
          onPress={handleNextLevel}
        >
          <Text style={styles.buttonText}>Next Level</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 50,
    alignItems: "center",
    marginTop: 120,
    justifyContent: "space-between",
  },
  image: {
    width: 300,
    height: 370,
    marginLeft: 20,
  },
  BackgroundImage: {
    width: "100%",
    height: "100%",
  },
  ProgressButton: {
    width: 200,
    height: 50,
    backgroundColor: "#00a8f3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  nextLevelButton: {
    marginTop: -30,
    backgroundColor: "black",
    padding: 13,
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default EnglishImageDrawer;
