import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ParkingList from "../components/parkings/ParkingList";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { FlatList } from "react-native";
import ParkingItem from "../components/parkings/ParkingItem";
// import { useIsFocused } from "@react-navigation/native";

const DemoScreen = ({ route }) => {
  const [loadParkings, setLoadParkings] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  // const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoad(true);
    const parkingQuery = collection(db, "parkings");
    onSnapshot(parkingQuery, (snap) => {
      let parkingList = [];
      snap.docs.map((doc) => parkingList.push({ ...doc.data(), id: doc.id }));
      setLoadParkings(parkingList);
      setIsLoad(false);
    });
  }, []);

  // console.log(loadParkings);

  
  // console.log(loadParkings[0].id);
  // console.log("The address is : " + loadParkings[0].address);

  // const tempRenderPark = (parking) =>{
  //   return (
  //     <>
  //             <Text>dsfsfsd</Text>
  //             <Text>The Address: {parking.address}</Text>
  //             <Text>Description: {parking.description}</Text>
  //             <Text>Price: {parking.price}</Text>
  //             <Text>Image: {parking.imageUri}</Text>
  //             {/* <Image source={{uri:parking.imageUri}} style={{width:125, height:150}} /> */}
  //             <Text>Location: {parking.location}</Text>
  //        </>
  //   )
  // }

  

  const renderParking = (parking) => {
    if (!loadParkings || loadParkings.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>No Parking found ...</Text>
        </View>
      );
    } else {
      return (
        <ParkingItem 
        parking={parking}
        backgroundColor={"black"}
        />
      )
      //   <View key={parking.id} style={styles.item}>
      //     <Text style={{ color: "black" }}>dsfsfsd</Text>
      //     <Text>The Address: {parking.address}</Text>
      //     <Text>Description: {parking.description}</Text>
      //     <Text>Price: {parking.price}</Text>
      //     {/* <Text>Image: {parking.imageUri}</Text> */}
      //     <Image
      //       source={{ uri: parking.imageUri }}
      //       style={{
      //         width: 260,
      //         height: 300,
      //         borderWidth: 2,
      //         borderColor: "#d35647",
      //         resizeMode: "contain",
      //         margin: 8,
      //       }}
      //     />
      //     <Text>Location: {parking.location}</Text>
      //   </View>
      // );
    }
  };

  return (
    <View style={styles.cont}>
      <FlatList
        data={loadParkings}
        renderItem={({item,index})=>{
          if (!loadParkings || loadParkings.length === 0) {
            return (
              <View style={styles.container}>
                <Text style={styles.text}>No Parking found ...</Text>
              </View>
            );
          } else {
            return (
              <ParkingItem 
              parking={item}
              backgroundColor={"black"}
              />
            )
          }
        }}
        keyExtractor={(item) => item.id}
    
      />
    </View>
    // <View style={styles.cont}>
    //   <ParkingList parkings={loadParkings} />
    // </View>
  );
};

export default DemoScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "#e4f4f4",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    marginTop: 24,
    // position:'relative'
  },
  flatList: {},
  item: {
    display: "flex",
    width: "100%",
    // backgroundColor: "#f9c2ff",
    padding: 32,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
