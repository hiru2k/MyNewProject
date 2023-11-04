import React, { useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import emptyTreeImage from "../assests/empty_tree.png";
import coloredTreeImage from "../assests/colored_tree.png";

import ColorPalette from "../components/ColorPalette";

const ImageDrawer = ({ imageUrl }) => {
  const [isColored, setIsColored] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 50,
    alignItems: "center",
    marginTop: 150,
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
});

export default ImageDrawer;
