import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { Pressable } from "react-native";
import { Alert } from "react-native";

import { AuthContext } from "../../store/contextAuth";
import { useNavigation } from "@react-navigation/native";

const ClockTimerCount = ({ parking }) => {
  const [rentDays, setRentDays] = useState([]);
  const [CurrentPush, setCurrentPush] = useState([]);
  const [CurrentElement, setCurrentElement] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(0);

  const { token, uuidToken } = useContext(AuthContext);

  const navigation = useNavigation();

  const updateStateRepeatedly = (times) => {
    let counter = 0;
    const intervalId = setInterval(() => {
      setDataLoaded((prevCount) => prevCount + 1);
      counter++;

      if (counter === times) {
        clearInterval(intervalId);
      }
    }, 3000);
  };

  useEffect(() => {
    updateStateRepeatedly(4);
  }, []);

  let currentSpotOwnerId = "";
  let isMatchId = false;
  let matchArrayList = [];
  let parkingIdForPush = parking ? parking.parkingID : "";

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

  rentDays.map((item) => {
    const curretnDate = new Date();
    const formattedDate = `${curretnDate.getUTCDate()}/${
      curretnDate.getUTCMonth() + 1
    }/${curretnDate.getUTCFullYear()}`;
    const isoDate2 = new Date(
      formattedDate.split("/").reverse().join("-")
    ).toISOString();
    const isoDate1 = new Date(
      item.availDays.whichDay.split("/").reverse().join("-")
    ).toISOString();

    if (item.matchOwnerId === parking.parkingID) {
      //update the function to return just the available dates

      matchArrayList.push(item);
      isMatchId = true;
    } else {
      return;
    }
  });
  
  console.log(isMatchId)
  console.log(rentDays)
  // rentDays.map((item) => {
  //   if (item.matchOwnerId === parking.parkingID) {
  //     matchArrayList.push(item);
  //     console.log("Matchhhhhhhhhhh")
  //     isMatchId = true;
  //   } else {
  //     return;
  //   }
  // });

  // const updateIsBusyFlag = async (itemId) => {
  //   // getPushToken();
  //   try {
  //     const itemRef = doc(db, "availableDates", itemId);

  //     const itemSnapshot = await getDoc(itemRef);
  //     const isBusy = itemSnapshot.data().isBusy;

  //     console.log(isBusy);

  //     if (isBusy === true) {
  //       Alert.alert("חניה זו כבר תפוסה ...");
  //       return;
  //     }

  //     await updateDoc(itemRef, { isBusy: true });
  //     console.log("the token is " + token);
  //     await updateDoc(itemRef, { rentBy: token });
  //     console.log("isBusy field updated successfully!");
  //     sendPushNotificationHandler();
  //   } catch (error) {
  //     console.error("Error updating isBusy field:", error);
  //   }
  // };

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
        // onPress: () => updateIsBusyFlag(item.id),
        onPress: () => {
          navigation.navigate("Paypal", {
            item,
            token,
            parking,
            CurrentElement,
          });
        },
        style: "cancel",
      },
    ]);
  };

  const daysTemp = <Text style={{ fontWeight: "bold" }}>יום:</Text>;
  const hoursTemp = <Text style={{ fontWeight: "bold" }}>שעות:</Text>;

  const getPushToken = async () => {
    const notifications = collection(db, "pushNotif");

    onSnapshot(notifications, async (snap) => {
      let parkingList = [];
      snap.docs.forEach((doc) => {
        const data = doc.data();
        parkingList.push({ ...data, id: doc.id });
      });

      setCurrentPush(parkingList);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPushToken();
      await saveTheToken();
    };

    fetchData();
  }, [CurrentElement, dataLoaded]);

  const updateCurrentElement = async () => {
    let isElementSet = false;

    while (!isElementSet) {
      try {
        for (const item of CurrentPush) {
          if (item.userIDToken === parkingIdForPush) {
            setCurrentElement(item.pushToken.data);
            isElementSet = true;
            console.log("ELEMENT UPDATEEEE!!!!!");
            break; // Exit the loop after updating the state
          }
        }
      } catch (error) {
        console.log(error);
      }

      // Wait for a brief moment before the next iteration
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  useEffect(() => {
    updateCurrentElement();
  }, [CurrentElement]);

  async function saveTheToken() {
    try {
      for (const item of CurrentPush) {
        if (item.userIDToken === parkingIdForPush) {
          setCurrentElement(item.pushToken.data);
          // console.log(CurrentElement);
          return; // Exit the loop after updating the state
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // to: "ExponentPushToken[***]",
        to: `${CurrentElement}`,
        title: "עדכון מ - EasyPark",
        body: "מישהו השכיר את החניה שלך !",
        sound: "default", // Specify the sound for the notification
      }),
    });
  }

  // console.log(CurrentElement);
  // console.log(CurrentPush);

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
        זמינות החניה
      </Text>

      {isMatchId ? (
        <View>
          {matchArrayList.map((item) => (
            <View
              key={new Date() + Math.random().toString()}
              style={item.isBusy ? styles.busyTimes : styles.availableTimes}
            >
              <Pressable
                onPress={() => {CurrentElement ? 
                  handleDoubleCheck(item) : Alert.alert("wait fot the push token update correctly!")
                }}
              >
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
