import { StyleSheet, Text, View, Pressable, Image, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/contextAuth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import ParkingItem from "../components/parkings/ParkingItem";

const ManageParking = () => {
  const { token, isAuthenticated } = useContext(AuthContext);

  const [parkingsToManage, setParkingsToManage] = useState([]);
  const [myParking, setMyParking] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  
  const [pressedButtonIndex, setPressedButtonIndex] = useState(null);

  useEffect(() => {
    fetchParkingsManage();
  }, []);

  const fetchParkingsManage = () => {
    setRefreshing(true);

    const parkingQuery = collection(db, "parkings");
    onSnapshot(parkingQuery, (snap) => {
      let parkingList = [];
      snap.docs.map((doc) => parkingList.push({ ...doc.data(), id: doc.id }));
      setParkingsToManage(parkingList);
 
        setRefreshing(false);
    });
      setMyParking(parkingsToManage.filter((item) => item.ownerParkingId === token));
 

    // handleShowLocation();
}

  console.log("The length is : " + myParking.length);
  // console.log("The token is : " + token);

  //   const theParkingIs = parkingsToManage.filter((item)=> item.parkingID === token)

  console.log(myParking);
//   console.log(myParking[0].imageUri);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" ,backgroundColor:'white' }}>
     
    {refreshing  ?       (  <Text>Loading...</Text>)
 : (
        <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar3.png",
            }}
          />
      
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.btnCont}>
          {/* <Pressable style={pressedButtonIndex === 0 ? styles.bigPressable : styles.pressable}>
            <Button
              title="בקשה לפרסום חניה"
              color="black"
              onPress={() =>
                setPressedButtonIndex(pressedButtonIndex === 0 ? null : 0)
              }
            />
          </Pressable> */}
          <Pressable style={pressedButtonIndex === 1 ? styles.bigPressable : styles.pressable}>
            <Button
              title="עריכת פרטי חניה"
              color="black"
              onPress={() =>
                setPressedButtonIndex(pressedButtonIndex === 1 ? null : 1)
              }
            />
          </Pressable>
          <Pressable style={pressedButtonIndex === 2 ? styles.bigPressable : styles.pressable}>
            <Button
              title="עריכת פרטים אישיים"
              color="black"
              onPress={() =>
                setPressedButtonIndex(pressedButtonIndex === 2 ? null : 2)
              }
            />
          </Pressable>
          <Pressable style={pressedButtonIndex === 3 ? styles.bigPressable : styles.pressable}>
            <Button
              title="היסטורית עסקאות"
              color="black"
               onPress={() =>
                setPressedButtonIndex(pressedButtonIndex === 3 ? null : 3)
              }
            />
          </Pressable>
          <Pressable style={pressedButtonIndex === 4 ? styles.bigPressable : styles.pressable}>
            <Button
              title="פיננסיים"
              color="black"
                onPress={() =>
                setPressedButtonIndex(pressedButtonIndex === 4 ? null : 4)
              }

            />
          </Pressable>
        </View>
      </View>
    </View>
    ) }
    </View>
  );
};

export default ManageParking;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },

  box: {
    padding: 5,
    marginBottom: 2,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },
  btnCont: {
    alignItems: "center",
    marginTop: 36,
    shadowColor: "white",
    shadowOffset: { width: 2, height: 4 },
    // shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  pressable: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    width: 250,
    height:100,
    marginTop: 24,
    backgroundColor: "lightblue",
  },
  bigPressable: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    width: 250,
    height:250,
    marginTop: 24,
    backgroundColor: "lightblue",
  },

});
