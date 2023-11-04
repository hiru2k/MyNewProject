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
import emptyTreeImage from "../assests/empty_tree.png";
import coloredTreeImage from "../assests/colored_tree.png";
import ProgressBar from "../components/ProgressBar";
import ColorPalette from "../components/ColorPalette";

const ImageDrawer = ({ imageUrl }) => {
  const [isColored, setIsColored] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const toggleImageColor = () => {
    setIsColored(!isColored);
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
  const greyColors = ["grey", "grey", "grey", "grey", "grey", "grey", "grey"];

  let selectedImage;
  let colorsToDisplay;
  switch (imageUrl) {
    case "tree":
      selectedImage = isColored ? coloredTreeImage : emptyTreeImage;
      colorsToDisplay = isColored ? greyColors : treeColors;
      break;
    case "flower":
      selectedImage = isColored ? flowerImage : emptyTreeImage;
      colorsToDisplay = isColored ? greyColors : treeColors;
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

  const progressBarStyles = StyleSheet.create({
    progressBarContainer: {
      backgroundColor: "#c3c3c3",
      height: 30,
      borderRadius: 10,
      marginBottom: 100,
      marginTop: 60,
      width: "80%",
      marginLeft: 40,
    },
    progressBar: {
      height: "100%",
      borderRadius: 10,
      backgroundColor: "#0ed145", // Green color for the progress bar
    },
    progressText: {
      fontSize: 20,
      color: "black",
      fontWeight: "bold",
    },
  });
  return (
    <ImageBackground
      source={require("../assests/background.png")}
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
        {isColored && (
          <TouchableOpacity
            style={styles.ProgressButton}
            onPress={checkProgress}
          >
            <Text style={styles.title}>ප්රගතිය බලන්න</Text>
          </TouchableOpacity>
        )}
      </View>
      {showProgressBar && (
        <ProgressBar percentage={progress} style={progressBarStyles} />
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
    marginTop: 80,
    justifyContent: "space-between",
  },
  image: {
    width: 300,
    height: 370,
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
    marginTop: 20,
    marginLeft: 80,
  },
  title: {
    color: "white",
    fontSize: 20,
  },
});

export default ImageDrawer;
