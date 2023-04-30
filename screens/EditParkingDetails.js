import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { Calendar, LocaleConfig } from "react-native-calendars";

import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../components/ui/Button";
import { Alert } from "react-native";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const EditParkingDetails = () => {
  const [selected, setSelected] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [untilTime, setUntilTime] = useState(new Date());

  const currentDate = new Date().toLocaleDateString();
  // console.log(currentDate)

  const updateParkingTime = () =>{
    Alert.alert("Update Successfully!", `the until time is :${untilTime}`)
    console.log(`the selectedDate : ${selected.toLocaleDateString()}`)
    console.log(`the until time : ${untilTime.toLocaleTimeString()}`)
  }
  

  const onUntilChange =  (e , selectedUntil) => {
    const currentUntilTime = selectedUntil || untilTime;
    setUntilTime(currentUntilTime);

  }
  const onFromChange =  (e , selectedFrom) => {
    const currentFromTime = selectedFrom || fromTime;
    setFromTime(currentFromTime);

  }
  const onDateChange =  (e , selectedDate) => {
    const currentDate = selectedDate || selected;
    setSelected(currentDate);

  }

  
  function addAvailableTimes() {
    try {
      const availableDb = collection(db, "availableDates");
      addDoc(availableDb, {
        availDays: {fromTime: fromTime.toLocaleTimeString(), untilTime:untilTime.toLocaleTimeString() ,whichDay:selected.toLocaleDateString()},
        matchOwnerId : '012301230',
        id: new Date().toString() + Math.random().toString(),
 
      });
      Alert.alert("Your Share-Parking request has been sent ! ","We will contact you soon ")
    } catch (error) {
      console.log(error)
      Alert.alert("Something went wrong..."," Please try again later or contact us ")

    }

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>עריכת פרטי חניה</Text>

      <View style={{ marginTop: 60 }}>


     
            <DateTimePicker
              value={selected}
              mode="date"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              display="default"

              onChange={onDateChange}
            />
 
        {/* <Calendar
          style={styles.calendar}
          onDayPress={(day) => {
            // console.log("Date : " + selected)
            setSelected(day.dateString);
          }}
          value={selected}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        /> */}
        <View style={{ display: "flex", alignItems: "stretch" }}>
          <View style={styles.fromTime}>
            <Text>From</Text>
            <DateTimePicker
              value={fromTime}
              mode="time"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onChange={onFromChange}
            />
          </View>
          <View style={styles.fromTime}>
            <Text>To </Text>
            <DateTimePicker
              value={untilTime}
              mode="time"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}

             onChange={onUntilChange}
              // onChange={(until)=>setUntilTime(until)}
            />
          </View>
        </View>
        <View style={styles.btn}>
        <Button onPress={addAvailableTimes}>Update</Button>
        </View>
      </View>
      {/* <Text>EditParkingDetails</Text> */}
    </View>
  );
};

export default EditParkingDetails;

const styles = StyleSheet.create({
  container: {
    flex:1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e4f4f4",

  },
  title: {
    marginTop: 24,
    fontWeight: "bold",
    fontSize:24
  },

  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary800,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary200,
  },
  fromTime: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 18,
  },
  calendar: {
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btn:{
    marginTop:24
  },
});
