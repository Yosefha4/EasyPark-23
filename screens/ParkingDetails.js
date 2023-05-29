import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import ClockTimerCount from "../components/parkings/ClockTimerCount";

import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

const ParkingDetails = ({ route, navigation }) => {
  const { parking } = route.params;

  // const [currentLocation, setCurrentLocation] = useState(null);
  // const [routeCoordinates, setRouteCoordinates] = useState([]);
  // const [showNavigationMap, setShowNavigationMap] = useState(false);

  // const handleNavigation = () => {
  //   const { latitude, longitude } = parking.location;
  //   const destination = `${latitude},${longitude}`;
  //   const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  //   Linking.openURL(url);
  // };

  // console.log(thisparking)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Text style={styles.address}>{parking.address}</Text>

        <Text style={styles.price}>{parking.price}₪ / שעה</Text>

        <ClockTimerCount parking={parking} />

        <Image
          source={{ uri: parking.imageUri }}
          style={{ width: 200, height: 200, marginTop: 40 }}
        />
        <View style={{ marginTop: 30 }}>
          {/* <Button children="Nav" onPress={handleNavigation} /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default ParkingDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#ffff",
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  //   container:{
  //     flex:1,
  //     gap:4,
  //     padding: 20,
  //     width:250,

  //     // justifyContent:'center',
  //     marginVertical: 8,
  //     marginHorizontal: 16,
  //     backgroundColor:"#ffff",
  //     color:'black',
  //     shadowColor: '#171717',
  //     shadowOffset: {width: -2, height: 4},
  //     shadowOpacity: 0.2,
  //     shadowRadius: 3,

  // },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
  },
  address: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 16,
  },
  price: {
    fontWeight: "bold",
    width: 120,
    color: "black", // Update to a vibrant color of your choice
    marginTop: 14,
    marginBottom: 24,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "lightblue", // Match the text color
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    backgroundColor: "#e4f4f4",
  },
  mapContainer: {
    flex: 1,
    width: "100%",
    height: 300,
    marginTop: 20,
  },
  map: {
    flex: 1,
  },
});
