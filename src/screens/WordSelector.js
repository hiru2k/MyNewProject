import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ProgressBar from "../components/ProgressBar"; // Import ProgressBar from separate file

const words = ["ගස", "මල", "බල්ලා", "පොත", "පෑන", "හාවා", "ඉර", "ගෙදර", "ඇපල්"];

const WordSelector = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const handleWordPress = (word) => {
    setSelectedWord(word);
  };

  const handlePlayButtonPress = () => {
    console.log("Play button pressed!");
  };

  const handleMicButtonPress = () => {
    console.log("Microphone button pressed!");

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
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.wordBox}>
            {words.map((word) => (
              <TouchableOpacity
                key={word}
                style={[
                  styles.wordButton,
                  {
                    backgroundColor: selectedWord === word ? "yellow" : "white",
                  },
                ]}
                onPress={() => handleWordPress(word)}
              >
                <Text style={styles.wordText}>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.btnPlayBox}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayButtonPress}
            >
              <Icon name="play" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.micButton}
              onPress={handleMicButtonPress}
            >
              <Icon name="microphone" size={30} color="white" />
            </TouchableOpacity>
          </View>
          {showProgressBar && (
            <ProgressBar percentage={progress} style={progressBarStyles} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wordBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    marginTop: 70,
    backgroundColor: "#65C2E2",
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  btnPlayBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },

  wordButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  wordText: {
    fontSize: 18,
  },
  playButton: {
    marginTop: 20,
    backgroundColor: "#8AE99A",
    padding: 20,
    borderRadius: 10,
  },
  micButton: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "black",
    padding: 20,
    height: 70,
    borderRadius: 10,
  },

  voiceAnimation: { width: "100%", aspectRatio: 2 },
  progressBarContainer: {
    backgroundColor: "#c3c3c3",
    height: 30,
    borderRadius: 10,
    marginTop: 100,
    width: "80%",
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

export default WordSelector;
