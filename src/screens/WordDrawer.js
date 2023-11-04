import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton from "../components/CameraButton";
import ProgressBar from "../components/ProgressBar";

const TreeAnimation = () => {
  const [displayedLetters, setDisplayedLetters] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const cameraRef = useRef(null);
  const word = "TREE";

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();

    let index = 0;
    const textInterval = setInterval(() => {
      setDisplayedLetters((prev) => prev + word[index]);
      index++;
      if (index === word.length) {
        clearInterval(textInterval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        setShowProgressBar(true); // Show progress bar when capturing a picture

        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);

        // Simulate progress update every second
        const interval = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress >= 50) {
              clearInterval(interval);
              // Hide progress bar after reaching 50%
            }
            return prevProgress + 1; //1% for 1ms
          });
        }, 20); // Update every 20ms for a smoother animation
      } catch (e) {
        console.log(e);
      }
    }
  };

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
      style={styles.backgroundImg}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.letter}>{displayedLetters}</Text>
          <View>
            <CameraButton
              title={"Take a picture"}
              icon="camera"
              onPress={takePicture}
            />
          </View>
          {!image ? (
            <Camera
              style={styles.camera}
              type={type}
              flashMode={flash}
              ref={cameraRef}
            />
          ) : (
            <Image source={{ uri: image }} style={styles.cameraImg} />
          )}
        </View>
      </View>
      {showProgressBar && (
        <ProgressBar percentage={progress} style={progressBarStyles} />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  letter: {
    fontSize: 40,
    margin: 10,
    marginTop: 150,
    color: "black",
    marginLeft: 150,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 200,
    margin: 20,
    height: 100,
  },
  cameraImg: {
    flex: 1,
    height: 100,
    marginTop: 50,
    marginBottom: 10,
    margin: 20,
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignContent: "center",
  },
  overlay: {
    flex: 1,
  },
  customProgressBar: {
    marginLeft: 1000, // Set your desired marginLeft here
  },
});

export default TreeAnimation;
