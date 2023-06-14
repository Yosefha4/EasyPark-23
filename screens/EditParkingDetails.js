import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../components/ui/Button";
import { Alert } from "react-native";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../store/contextAuth";

import { Ionicons } from "@expo/vector-icons";

const EditParkingDetails = ({route}) => {
  const [selected, setSelected] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [untilTime, setUntilTime] = useState(new Date());

  //add availableDays section
  const [availableDays, setAvailableDays] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);

  const { userCurrentToken } = route.params;


  useEffect(() => {
    // Fetch the current available days from the database and update the state
    const fetchAvailableDays = async () => {
      try {
        const availableDb = collection(db, "availableDates");

        const q = query(availableDb, where("matchOwnerId", "==", userCurrentToken)); // Filter by matchOwnerId
        const querySnapshot = await getDocs(q);
        const availableDaysData = querySnapshot.docs.map((doc) => doc.data());

        setAvailableDays(availableDaysData);
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Something went wrong...",
          " Please try again later or contact us "
        );
      }
    };

    fetchAvailableDays();
  }, []);

  useEffect(() => {
    if (availableDays) {
      const sortedArr = sortArrayByMonth(availableDays);
      setSortedArray(sortedArr);

    }
  }, []);

  const sortArrayByMonth = (arr) => {
    arr.sort((a, b) => {
      const datePartsA = a.availDays.whichDay.split("/")[1];
      const datePartsB = b.availDays.whichDay.split("/")[1];
      return datePartsA - datePartsB;
    });
    return arr;
  };

  const { token, isAuthenticated } = useContext(AuthContext);

  const updateParkingTime = () => {
    Alert.alert("Update Successfully!", `the until time is :${untilTime}`);
    console.log(`the selectedDate : ${selected.toLocaleDateString()}`);
    console.log(`the until time : ${untilTime.toLocaleTimeString()}`);
  };

  const onUntilChange = (e, selectedUntil) => {
    const currentUntilTime = selectedUntil || untilTime;
    setUntilTime(currentUntilTime);
  };
  const onFromChange = (e, selectedFrom) => {
    const currentFromTime = selectedFrom || fromTime;
    setFromTime(currentFromTime);
  };
  const onDateChange = (e, selectedDate) => {
    const currentDate = selectedDate || selected;
    setSelected(currentDate);
  };

  async function addAvailableTimes() {
    try {
      const availableDb = collection(db, "availableDates");

      //Check the selected time
      const q = query(
        availableDb,
        where("availDays.whichDay", "==", selected.toLocaleDateString()),
        where("availDays.fromTime", "==", fromTime.toLocaleTimeString()),
        where("availDays.untilTime", "==", untilTime.toLocaleTimeString())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("הזמן כבר קיים במערכת", "אנא בחר זמן אחר");
        return;
      }

      // Add new time
      await addDoc(availableDb, {
        availDays: {
          fromTime: fromTime.toLocaleTimeString(),
          untilTime: untilTime.toLocaleTimeString(),
          whichDay: selected.toLocaleDateString(),
        },
        matchOwnerId: userCurrentToken,
        id: new Date().toString() + Math.random().toString(),
        isBusy: false,
        rentBy: "",
      });
      Alert.alert("זמני החניה עודכנו בהצלחה");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Something went wrong...",
        " Please try again later or contact us "
      );
    }
  }

  const confirmDeleteAvailableDay = (item) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this available day?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => deleteAvailableDay(item.id) },
      ]
    );
  };

  const deleteAvailableDay = async (id) => {
    try {
      // Perform the necessary action to delete the item from the database
      await deleteDoc(doc(db, "availableDates", id));
      Alert.alert("Success", "Available day deleted successfully");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to delete available day");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>עריכת פרטי חניה</Text>

      <View style={{ marginTop: 36 }}>
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
            />
          </View>
        </View>
        <View style={styles.btn}>
          <Button
            onPress={() => {
              Alert.alert(
                "מעוניין לפרסם את הזמן ? ",
                "הזמנים שבחרת יתווספו לרשימת הזמנים הפנויים ויהיו זמינים להשכרה",
                [
                  {
                    text: "אישור",
                    onPress: () => addAvailableTimes(),
                    style: "cancel",
                  },
                  { text: "ביטול" },
                ]
              );
            }}
          >
            עדכן
          </Button>
        </View>
      </View>
      <Text style={styles.sectionTitle}>ימים זמינים נוכחיים:</Text>
      <FlatList
        data={sortedArray.length > 0 ? sortedArray : availableDays}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity>
              <View style={item.isBusy ? styles.busyDays : styles.availableDay}>
                <Text>{item.availDays.whichDay}</Text>
                <Text>From: {item.availDays.fromTime}</Text>
                <Text>To: {item.availDays.untilTime}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteIconContainer}
              onPress={() => confirmDeleteAvailableDay(item)}
            >
              <Ionicons name="trash-bin" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.availableDaysContainer}
      />
    </View>
  );
};

export default EditParkingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e4f4f4",
  },
  title: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 24,
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
  btn: {
    marginTop: 24,
    fontWeight: "bold",
    fontSize: 36,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 24,
  },
  availableDaysContainer: {
    marginTop: 12,
  },
  availableDay: {
    marginBottom: 12,
    backgroundColor: "#66FF99",
    padding: 8,
    borderRadius: 4,
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  busyDays: {
    marginBottom: 12,
    backgroundColor: "#ff726f",
    padding: 8,
    borderRadius: 4,
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteIconContainer: {
    marginLeft: 8,
  },
});
