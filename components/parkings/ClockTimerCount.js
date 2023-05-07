import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Pressable } from "react-native";
import { Alert } from "react-native";

const ClockTimerCount = ({ parking }) => {
  const [rentDays, setRentDays] = useState([]);
  // const [isMatchId, setIsMatchId] = useState(false)
  // const [fromHour,setFromHour] = useState('')
  // const [untilHour,setUntilHour] = useState('')

  let currentSpotOwnerId = "";
  let tempArray = '';
  let isMatchId = false;
  let matchArrayList  = [] ;

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

  // console.log(rentDays);
  console.log(currentSpotOwnerId);

  rentDays.map((item) => {
    if (item.matchOwnerId === currentSpotOwnerId) {
      isMatchId = true;
      matchArrayList.push(item)
    } else {
      return;
    }
  });



  //  tempArray =  rentDays.filter((item) => item.ownerParkingId !== currentSpotOwnerId)
  //  const secArr =  rentDays.map((item) => item.ownerParkingId !== currentSpotOwnerId)

  //  console.log(tempArray)
  //  console.log(secArr)

  // let rentDays  = [];
  // let rentMonth  = [];

  // let fromHour ;
  // let untilHour ;

  // let pubDay ;

  // try {

  //   pubDay = parking.reserveTime.selectedDate[0];
  //   fromHour = parking.reserveTime.selectedDate[1];
  //   untilHour = parking.reserveTime.selectedDate[2];
  //   // rentDays= parking.reserveTime.daysForRent
  // //   parking.reserveTime.daysForRent.map((day) => {
  // //     rentDays.push(day)

  // //   })
  // // //  rentDays = rentDays.split(" ")
  // //   fromHour = parking.reserveTime.hoursForRent[0]
  // //   untilHour = parking.reserveTime.hoursForRent[1]
  // } catch (error) {
  //   console.log(error)
  // }

  const daysTemp = <Text style={{fontWeight:'bold'}}>יום:</Text>
  const hoursTemp = <Text style={{fontWeight:'bold'}}>שעות:</Text>

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16 ,textAlign:'center'}}>
        זמינות החניה
      </Text>

      {isMatchId ? (
        <View>
          {/* <Text>we have available date !</Text> */}
         
          {matchArrayList.map((item)=>(
             <View key={new Date() + Math.random().toString()} style={styles.availableTimes}>
              <Pressable onPress={()=> Alert.alert("ParkingPressed!")}>
  
            <Text style={{textAlign:'center'}}>{daysTemp} {item.availDays.whichDay}</Text>
            <Text style={{textAlign:'center'}}>{hoursTemp} {item.availDays.fromTime} - {item.availDays.untilTime}</Text>
            </Pressable>
            </View>
          ))}
        
        </View>
      ) : (
        <Text style={{marginTop:14}}>מצטערים ... חניה זו אינה זמינה כרגע </Text>
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
  availableTimes:{
    marginTop:14,
    gap:8,
    borderWidth:1,
    borderColor:'black',
    borderRadius:6,
    padding:8,
    backgroundColor:'lightblue'
  },
});
