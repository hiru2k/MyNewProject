import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton from "../../components/CameraButton";
import ProgressBar from "../../components/ProgressBar";
import { useNavigation } from "@react-navigation/native";

const SinhalaWordDrawer = ({ route }) => {
  const { word } = route.params ?? {};
  const [displayedLetters, setDisplayedLetters] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [showNextLevelBtn, setShowNextLevelBtn] = useState(false);
  const navigation = useNavigation();

  const cameraRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      if (mounted) setHasCameraPermission(cameraStatus.status === "granted");
    })();

    let index = 0;
    const textInterval = setInterval(() => {
      if (!mounted) {
        clearInterval(textInterval);
        return;
      }

      setDisplayedLetters((prev) => prev + word[index]);
      index++;
      if (index === word.length) {
        clearInterval(textInterval);
      }
    }, 1000);

    return () => {
      clearInterval(textInterval);
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!startLoading) return;

    const progressBarInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 50) {
          clearInterval(progressBarInterval);
          setShowNextLevelBtn(true);
        }
        return prevProgress + 1; // 1% for 1ms
      });
    }, 20);

    return () => {
      clearInterval(progressBarInterval);
    };
  }, [startLoading]);

  const takePicture = async () => {
    if (cameraRef.current) {
      // Add null check here
      try {
        setShowProgressBar(true);
        setStartLoading(true);
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);

        const interval = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress >= 50) {
              clearInterval(interval);
            }
            return prevProgress + 1;
          });
        }, 20);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("Camera reference is null");
    }
  };
  const handleNextLevel = () => {
    navigation.navigate("SinhalaImageDrawer", { word: word });
  };

  const progressBarStyles = StyleSheet.create({
    progressBarContainer: {
      backgroundColor: "#c3c3c3",
      height: 30,
      borderRadius: 10,
      marginBottom: 100,
      marginTop: 50,
      width: "80%",
      marginLeft: 40,
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
      {showNextLevelBtn && (
        <TouchableOpacity
          style={styles.nextStepButton}
          onPress={handleNextLevel}
        >
          <Text style={styles.buttonText}>ඊළඟ පියවර</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: -100,
  },
  letter: {
    fontSize: 40,
    margin: 10,
    marginTop: 150,
    color: "black",
    alignSelf: "center",
  },
  camera: {
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 200,
    margin: 20,
    height: 300,
  },
  cameraImg: {
    height: 300,
    marginTop: -90,

    margin: 20,
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignContent: "center",
  },

  customProgressBar: {
    marginLeft: 1000,
  },
  nextStepButton: {
    marginTop: 50,
    backgroundColor: "black",
    padding: 13,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default SinhalaWordDrawer;
