import { View, Image, Text, StyleSheet } from "react-native";
// import Button from "../ui/Button";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Button } from "react-native";
import { Alert } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/styles";
import OutlinedButton from "../ui/OutlinedButton";

function ImagePicker({onTakeImage}) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app"
      );
      return false;
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
    // console.log(image.assets[0].uri)
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>עדיין לא צולמה תמונה</Text>;
  if (pickedImage) {
    imagePreview = <Image style={style.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={style.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon='camera' onPress={takeImageHandler} >צלם/העלה תמונה</OutlinedButton>
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
    backgroundColor: 'white',
    borderRadius: 4,
  },
  image:{
    width:'100%',
    height:'100%'
  }
});
