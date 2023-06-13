import { View, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Alert } from "react-native";
import { useState } from "react";
import OutlinedButton from "../ui/OutlinedButton";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      return new Promise((resolve) => {
        Alert.alert(
          "Insufficient Permissions!",
          "You need to grant camera permissions to use this app",
          [
            {
              text: 'Deny',
              style: 'cancel',
              onPress: () => {
                resolve(false);
              },
            },
            {
              text: 'Allow',
              onPress: () => {
                resolve(requestPermission().then((response) => response.granted));
              },
            },
          ]
        );
      });
    }
  
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (image.canceled) {
      setPickedImage("");
      onTakeImage("");
    } else {
      const uploadUrl = await uploadImageAsync(image.assets[0].uri);

      setPickedImage(uploadUrl);
      onTakeImage(uploadUrl);

      console.log(image.assets[0].uri);
    }
  }

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storage, `Images/image-${Date.now()}`);
      const result = await uploadBytes(storageRef, blob);

      blob.close();

      return await getDownloadURL(storageRef);
    } catch (error) {
      Alert.alert("Error", `: ${error}`);
    }
  };

  let imagePreview = <Text>עדיין לא צולמה תמונה</Text>;
  if (pickedImage) {
    imagePreview = <Image style={style.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View testID="image-picker-component">
      <View style={style.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        צלם/העלה תמונה
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const style = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
