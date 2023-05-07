import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import ParkingList from "../components/parkings/ParkingList";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { FlatList } from "react-native";
import ParkingItem from "../components/parkings/ParkingItem";
import Button from "../components/ui/Button";
// import { useIsFocused } from "@react-navigation/native";

const DemoScreen = ({ route }) => {
  const [loadParkings, setLoadParkings] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParkings, setFilteredParkings] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
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

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    console.log(searchQuery)
  };

  const modifySearchParkings = () =>{
    if(!loadParkings || loadParkings.length === 0){
      return (<Text>Sorry , parking not found .</Text>)
    }
    setIsFilter(true)
    let filterParkings = [];
    filterParkings = loadParkings.filter((parking) => parking.title.includes(searchQuery))
    setFilteredParkings(filterParkings)

  }




  return (
    <View style={styles.cont}>
      <View style={styles.topCont}>
        <Button onPress={modifySearchParkings}>חפש</Button>
        <TextInput
          style={styles.searchInput}
          placeholder="  חיפוש לפי עיר"
          onChangeText={handleSearchQuery}
          value={searchQuery}
        />
      </View>
    { !isFilter ? <FlatList
        data={loadParkings}
        renderItem={({ item, index }) => {
          if (!loadParkings || loadParkings.length === 0) {
            return (
              <View style={styles.container}>
                <Text style={styles.text}>לא נמצאו חניות...</Text>
              </View>
            );
          } else {
            return <ParkingItem parking={item} backgroundColor={"black"} />;
          }
        }}
        keyExtractor={(item) => item.id}
      /> : <FlatList
      data={filteredParkings}
      renderItem={({ item, index }) => {
        if (!filteredParkings || filteredParkings.length === 0) {
          return (
            <View style={styles.container}>
              <Text style={styles.text}>לא נמצאו חניות...</Text>
            </View>
          );
        } else {
          return <ParkingItem parking={item} backgroundColor={"black"} />;
        }
      }}
      keyExtractor={(item) => item.id}
    /> }
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
  searchInput: {
    height: 40,
    width: 180,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    // marginBottom: 30,
    marginLeft: 15,
    textAlign: "right",
  },
  topCont: {
    height: 40,
    marginBottom: 20,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
  },
});
