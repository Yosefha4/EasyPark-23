import { Alert } from "react-native";
import { View, StyleSheet } from "react-native";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import OutlinedButton from "../ui/OutlinedButton";
import { useEffect, useState } from "react";

import { Text } from "react-native";

function LocationPicker({ onTakeLocation }) {
  const [currentLocation, setCurrentLocation] = useState([]);
  const [locationPermission, requestPermission] = useForegroundPermissions();

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
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {currentLocation.lat && (
          <View style={styles.map}>
            <Text>Your lat : {currentLocation.lat}</Text>
            <Text>Your lng : {currentLocation.lng}</Text>
          </View>
        )}
      </View>
      <View>
        <OutlinedButton onPress={getLocationHandler} icon="location">
          שיתוף מיקום
        </OutlinedButton>
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
    backgroundColor: "white",
    borderRadius: 4,
    position: "relative",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
    position: "absolute",
  },
});
