import { Alert } from "react-native";
import { View, StyleSheet } from "react-native";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { Colors } from "../../constants/styles";
import OutlinedButton from "../ui/OutlinedButton";
import { useEffect, useState } from "react";

import MapView, { Marker } from "react-native-maps";

import { Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import { getAddress } from "../../utils/auth";

function LocationPicker({ onTakeLocation }) {
  const [currentLocation, setCurrentLocation] = useState([]);
  const [locationPermission, requestPermission] = useForegroundPermissions();

  // const route = useRoute();

  useEffect(() => {
    onTakeLocation(currentLocation);
  }, [currentLocation, onTakeLocation]);

  async function verifyPermission() {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    const coordsXY = { lat, lng };

    setCurrentLocation({ lat: lat, lng: lng });
    console.log(currentLocation);

    // setCurrentLocation( coordsXY.lat,coordsXY.lng)

    // console.log(location);
    // console.log(coordsXY);
    // console.log("The Current Location is : " + lat , lng);

  //   try {
  //     if(location){
  //     const convertedAddress =  await getAddress(lat,lng);
  //     console.log(convertedAddress)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  
  }
  // console.log(currentLocation);

  // const convertedAddress = getAddress(location.coords.latitude,location.coords.longitude);
  // console.log(convertedAddress)

  // function pickOnMapHandler() {}
  return (
    <View>
      <View style={styles.mapPreview}>
        {currentLocation.lat && (
          <View style={styles.map}>

            <Text>Your lat : {currentLocation.lat}</Text>
            <Text>Your lng : {currentLocation.lng}</Text>
          </View>
        )}

        {/* {currentLocation && <>
        <Text>Your Current Location is : {currentLocation} </Text>
        </>} */}
      </View>
      <View>
        <OutlinedButton onPress={getLocationHandler} icon="location">
          שיתוף מיקום
        </OutlinedButton>
        {/* <OutlinedButton onPress={pickOnMapHandler} icon="map">
          Pick on Map
        </OutlinedButton> */}
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    borderRadius: 4,
    position:'relative'
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  map:{
    flex:1
    ,position:'absolute'
  }
});
