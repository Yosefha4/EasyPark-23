import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Pressable } from "react-native";
import { Alert } from "react-native";

import { AuthContext } from "../../store/contextAuth";
import { useNavigation } from "@react-navigation/native";

const ClockTimerCount = ({ parking }) => {
  const [rentDays, setRentDays] = useState([]);

  const { token, isAuthenticated } = useContext(AuthContext);

  const navigation = useNavigation();

  // const [isMatchId, setIsMatchId] = useState(false)
  // const [fromHour,setFromHour] = useState('')
  // const [untilHour,setUntilHour] = useState('')

  let currentSpotOwnerId = "";
  let tempArray = "";
  let isMatchId = false;
  let matchArrayList = [];

  useEffect(() => {
    const parkingQuery = collection(db, "availableDates");
    onSnapshot(parkingQuery, (snap) => {
      let rentDaysList = [];
      snap.docs.map((doc) => rentDaysList.push({ ...doc.data(), id: doc.id }));
      setRentDays(rentDaysList);
    });
  }, []);

  try {
    currentSpotOwnerId = parking.ownerParkingId;
    tempArray = rentDays.filter(
      (item) => item.ownerParkingId !== currentSpotOwnerId
    );
  } catch (error) {
    console.log(error);
  }

  console.log(currentSpotOwnerId);
  // console.log(new Date().getTime());
  // console.log(new Date().getMonth())

  rentDays.map((item) => {
    if (item.matchOwnerId === parking.parkingID) {
      matchArrayList.push(item);
      console.log("Matchhhhhhhhhhh")
      isMatchId = true;
    } else {
      return;
    }
  });

  // console.log("the rent days array length is : " + rentDays.length)

  const updateIsBusyFlag = async (itemId) => {
    try {
      const itemRef = doc(db, "availableDates", itemId);

      const itemSnapshot = await getDoc(itemRef);
      const isBusy = itemSnapshot.data().isBusy;

      console.log(isBusy)

      if(isBusy === true){
        Alert.alert("חניה זו כבר תפוסה ...");
        return;
      }

      await updateDoc(itemRef, { isBusy: true });
      console.log("the token is " + token);
      await updateDoc(itemRef, { rentBy: token });
      console.log("isBusy field updated successfully!");
    } catch (error) {
      console.error("Error updating isBusy field:", error);
    }
  };

  const handleDoubleCheck = (item) => {
    Alert.alert("מעוניינ/ת להזמין את החניה ? ", "למעבר אל דף התשלום", [
      ,
      {
        text: "ביטול",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "אישור",
        onPress: () => updateIsBusyFlag(item.id),
        // onPress: () => navigation.navigate("Paypal", { item, token, parking }),
        style: "cancel",
      },
    ]);
  };

  console.log(matchArrayList);

  const daysTemp = <Text style={{ fontWeight: "bold" }}>יום:</Text>;
  const hoursTemp = <Text style={{ fontWeight: "bold" }}>שעות:</Text>;

  // const handleAvailStyle =

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
        זמינות החניה
      </Text>

      {isMatchId ? (
        <View>
          {/* <Text>we have available date !</Text> */}

          {matchArrayList.map((item) => (
            <View
              key={new Date() + Math.random().toString()}
              style={item.isBusy ? styles.busyTimes : styles.availableTimes}
            >
              <Pressable onPress={() => handleDoubleCheck(item)}>
                <Text style={{ textAlign: "center" }}>
                  {daysTemp} {item.availDays.whichDay}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  {hoursTemp} {item.availDays.fromTime} -{" "}
                  {item.availDays.untilTime}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ marginTop: 14 }}>
          מצטערים ... חניה זו אינה זמינה כרגע{" "}
        </Text>
      )}

      {/* <Text>{rentDays}</Text> */}

      {/* <View style={styles.days}>
      {rentDays.map((day) => (
        <Text id={new Date().toString() + Math.random().toString()}>{day}</Text>
      ))}
      </View> */}

      {/* <Text>{pubDay}</Text>
      <Text>{fromHour}</Text>
      <Text>{untilHour}</Text> */}

      {/* <Text>{parking.reserveTime.daysForRent}</Text>
      <Text>{parking.reserveTime.hoursForRent[0]}</Text> */}
    </View>
  );
};

export default ClockTimerCount;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    marginTop: 14,
  },
  days: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  availableTimes: {
    marginTop: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#66FF99",
  },
  busyTimes: {
    marginTop: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#ff726f",
  },
});
