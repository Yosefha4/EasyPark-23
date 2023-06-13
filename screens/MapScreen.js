import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import MapView, {
  Marker,
  Circle,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import * as Location from "expo-location";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

import ParkingDetails from "./ParkingDetails";
import ParkingItem from "../components/parkings/ParkingItem";
import { Alert } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

const MapScreen = ({ route }) => {
  const [parkingsMarkers, setParkingsMarkers] = useState([]);
  const [loadingParking, setLoadingParking] = useState(false);
  const [filterParkings, setFilterParkings] = useState([]);

  const navigation = useNavigation();

  // ********** //
  const [showRadiusCircle, setShowRadiusCircle] = useState(false);

  const [currentLocation, setCurrentLocation] = useState(null);

  const [mapRegion, setMapRegion] = useState({
    latitude: 31.771959,
    longitude: 35.217018,
    latitudeDelta: 1.8524,
    longitudeDelta: 0.4648,
  });

  const handleShowLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      alert("Permission to access location was denied");
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    setCurrentLocation(coords);
  };

  const displayCircleOnMap = () => {
    setShowRadiusCircle(!showRadiusCircle);
  };

  // ********** //

  useEffect(() => {
    setLoadingParking(true);
    const parkingQuery = collection(db, "parkings");
    onSnapshot(parkingQuery, (snap) => {
      let parkingList = [];
      snap.docs.map((doc) => parkingList.push({ ...doc.data(), id: doc.id }));
      setParkingsMarkers(parkingList);
      filterConfirmParkings();
      setLoadingParking(false);
    });

    handleShowLocation();
  }, [currentLocation]);

  const filterConfirmParkings = async () => {
    try {
      const filteredPark = await parkingsMarkers.filter(
        (parking) => parking.isConfirm === true
      );
      setFilterParkings(filteredPark);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const handleZoomIn = () => {
    let newRegion;
    if (currentLocation) {
      newRegion = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: mapRegion.latitudeDelta / 2,
        longitudeDelta: mapRegion.longitudeDelta / 2,
      };
    } else {
      newRegion = {
        ...mapRegion,
        latitudeDelta: mapRegion.latitudeDelta / 2,
        longitudeDelta: mapRegion.longitudeDelta / 2,
      };
    }

    setMapRegion(newRegion);
  };

  const handleZoomOut = () => {
    let newRegion;
    if (currentLocation) {
      newRegion = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: mapRegion.latitudeDelta * 2,
        longitudeDelta: mapRegion.longitudeDelta * 2,
      };
    } else {
      newRegion = {
        ...mapRegion,
        latitudeDelta: mapRegion.latitudeDelta * 2,
        longitudeDelta: mapRegion.longitudeDelta * 2,
      };
    }
    setMapRegion(newRegion);
  };

  return (
    <View style={styles.cont} testID="map-view">
      <MapView
        region={mapRegion}
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
      >
        {filterParkings &&
          filterParkings.map((parking) => (
            <Marker
              onPress={() => {
                navigation.navigate("Parkingdetails", { parking });
              }}
              key={parking.id}
              coordinate={{
                latitude: parking.location.lat,
                longitude: parking.location.lng,
              }}
              title={parking.address}
              description={`${parking.price}₪ / שעה`}
              testID={`parking-marker-${parking.id}`} // Add the testID prop here
            />
          ))}
      </MapView>

      {showRadiusCircle && currentLocation && (
        <Circle
          center={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          radius={20000}
          strokeColor={"rgba(158, 158, 255, 1)"}
          fillColor={"rgba(158, 158, 255, 0.3)"}
          strokeWidth={2}
          style={{ position: "absolute" }}
        />
      )}

      <View style={styles.topContainer}>
        <View style={styles.icons}>
          <FontAwesome
            name="plus-square-o"
            size={40}
            style={{ marginRight: 8 }}
            onPress={handleZoomIn}
            testID="zoomInBtn"
          />
          <FontAwesome
            name="minus-square-o"
            size={40}
            onPress={handleZoomOut}
            testID="zoomOutBtn"
          />
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  map: {
    flex: 1,
  },

  showBtn: {
    backgroundColor: "transparent",
    position: "absolute",

    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 6,
    fontWeight: "bold",
  },
  topContainer: {
    flexDirection: "column",
    position: "absolute",
  },
  icons: {
    flexDirection: "row",

    paddingHorizontal: 12,
    paddingVertical: 20,
  },
});
