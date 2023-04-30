import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapView, { Marker , PROVIDER_GOOGLE } from "react-native-maps";

import PinImageMarker from "../assets/pinM.png";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import ParkingDetails from "./ParkingDetails";
import ParkingItem from "../components/parkings/ParkingItem";

const Tab = createBottomTabNavigator();


const markers = [
  {
    mark1: { latitude: 31.423196, longitude: 34.595254 },
    mark2: { latitude: 32.109333, longitude: 34.855499 },
    mark3: { latitude: 31.66926, longitude: 34.57149 },
  },
];
// const markers = [
//   {mark1:{latitude :31.423196, longitude: 34.595254},},
//   {mark2:{latitude :32.109333, longitude: 34.855499},},
//   {mark3:{latitude :31.66926, longitude: 34.57149},},
// ]




const MapScreen = () => {
  const [parkingsMarkers, setParkingsMarkers] = useState([]);
  const [loadingParking, setLoadingParking] = useState(false);
  // const isFocused = useIsFocused();

  
const navigation = useNavigation();

  useEffect(() => {
    setLoadingParking(true);
    const parkingQuery = collection(db, "parkings");
    onSnapshot(parkingQuery, (snap) => {
      let parkingList = [];
      snap.docs.map((doc) => parkingList.push({ ...doc.data(), id: doc.id }));
      setParkingsMarkers(parkingList);
      setLoadingParking(false);
    });
  }, []);

//   const handelParking = (id) =>{
//     for(let i = 0 ; i<parkingsMarkers.length;i++){
//       console.log(parkingsMarkers[i])
// }
 
    
    
//   }
  


  return (
    <View style={styles.cont}>
      {/* <Text>PersonalScreen</Text> */}
      <MapView
        initialRegion={{
          latitude: 31.771959,
          longitude: 35.217018,
          latitudeDelta: 1.8524,
          longitudeDelta: 0.4648,
        }}
        provider={PROVIDER_GOOGLE }
        style={styles.map}
      >
        {/* {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
         
        ))} */}
       { parkingsMarkers.map((parking) => (
          <Marker onPress={()=> navigation.navigate("Parkingdetails", {parking})} key={parking.id} coordinate={{latitude:parking.location.lat, longitude:parking.location.lng}} title={parking.title} description={`${parking.price}₪ / שעה`} />
       ))}

        {/* <Marker coordinate={{latitude :31.423196, longitude: 34.595254}} /> */}
      </MapView>
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
});
