import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
// import Button from "../components/ui/Button";

import PinImageMarker from "../assets/pinM.png";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import ParkingDetails from "./ParkingDetails";
import ParkingItem from "../components/parkings/ParkingItem";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const MapScreen = ({route}) => {
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
    if(currentLocation){
       newRegion = {
        latitude: currentLocation.latitude,
        longitude:currentLocation.longitude,
        latitudeDelta: mapRegion.latitudeDelta / 2,
        longitudeDelta: mapRegion.longitudeDelta / 2 ,
      }
    }
    else{
       newRegion = {
        ...mapRegion,
        latitudeDelta: mapRegion.latitudeDelta / 2,
        longitudeDelta: mapRegion.longitudeDelta / 2 ,
      };
    }

    setMapRegion(newRegion);
  };

  const handleZoomOut = () => {
    let newRegion;
    if(currentLocation){
       newRegion = {
        latitude: currentLocation.latitude,
        longitude:currentLocation.longitude,
        latitudeDelta: mapRegion.latitudeDelta * 2,
        longitudeDelta: mapRegion.longitudeDelta * 2 ,
      }
    }
    else{
       newRegion = {
        ...mapRegion,
        latitudeDelta: mapRegion.latitudeDelta * 2,
        longitudeDelta: mapRegion.longitudeDelta * 2 ,
      };
    }
    setMapRegion(newRegion);
  };

  // const filterParkings = parkingsMarkers.filter((parking) => parking.isConfirm = true);

  // console.log(filterParkings)

  return (
    <View style={styles.cont}>
      <MapView
        region={mapRegion}
        // region={{
        //   latitude: currentLocation ? currentLocation.latitude : 31.771959,
        //   longitude: currentLocation ? currentLocation.longitude : 35.217018,
        //   latitudeDelta: 1.8524,
        //   longitudeDelta: 0.4648,
        // }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
      >
        {filterParkings &&
          filterParkings.map((parking) => (
            <Marker
              onPress={() => {
                navigation.navigate("Parkingdetails", { parking  })
                
              }
              }
              key={parking.id}
              coordinate={{
                latitude: parking.location.lat,
                longitude: parking.location.lng,
              }}
              title={parking.title}
              description={`${parking.price}₪ / שעה`}
            />
          ))}

        {/* {showRadiusCircle && (
          <Marker
            key={currentLocation.latitude + Math.random(15)}
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            pinColor="blue"
          />
        )} */}

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
          />
        )}

        <View style={styles.topContainer}>
          <View style={styles.showBtn}>
            <Button
              title="הצג מיקום"
              onPress={displayCircleOnMap}
              color="black"
            />
          </View>
       
            <View style={styles.icons}>
              <Icon name="plus-square-o" size={40} style={{marginRight:8}} onPress={handleZoomIn} />
              <Icon name="minus-square-o" size={40} onPress={handleZoomOut} />
            </View>

            </View>

       
      </MapView>
      {/* <Icon /> */}
      {/* <Button onPress={displayCircleOnMap}>Show My Location</Button> */}
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

    // width:150,
    // top:15,left:20,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 6,
    fontWeight: "bold",
  },
  topContainer: {
    flexDirection: 'column',
    
    // alignItems: 'flex-start',
    // justifyContent: 'space-between',
  },
  icons:{
    flexDirection: 'row',
  //  marginTop:24,
  //  padding:40,
   paddingHorizontal:12,
   paddingVertical:50

  }

});
