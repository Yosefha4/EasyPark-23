import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "../../constants/styles";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { Parking } from "../../models/parking";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

const ParkingForm = ({ onCreateParking }) => {
  const navigation = useNavigation();
  const [pickedImage, setPickedImage] = useState();
  const [pickedLocation, setPicketLocation] = useState();

  const [enterTitle, setEnterTitle] = useState("");
  const [enterAddress, setEnterAddress] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterOwnerId, setEnterOwnerId] = useState("");

  function addParking() {
    try {
      const parkingDb = collection(db, "parkings");
      addDoc(parkingDb, {
        address: enterAddress,
        description: enterDescription,
        imageUri: pickedImage,
        location: {lat:pickedLocation.lat,lng:pickedLocation.lng},
        // location: pickedLocation.toString(),
        parkingID: new Date().toString() + Math.random().toString(),
        ownerParkingId : enterOwnerId,
        price: enterPrice,
        title: enterTitle,
        isConfirm : false,
      });
      Alert.alert("בקשת שיתוף החניה שלך נשלחה ! ","ניצור איתך קשר בהקדם . ")
    } catch (error) {
      console.log(error)
      Alert.alert("משהו השתבש..."," אנא נסה שוב מאוחר יותר או צור איתנו קשר ")

    }

  }

//  function editAvailableFunc(){
//   navigation.navigate("EditParkingDetails")
//  }

  function changeTitleHandler(enterText) {
    setEnterTitle(enterText);
  }
  function changeAddressHandler(enterText) {
    setEnterAddress(enterText);
  }
  function changePriceHandler(enterText) {
    setEnterPrice(enterText);
  }
  function changeDescHandler(enterText) {
    setEnterDescription(enterText);
  }
  function changeOwnerId(enterText) {
    setEnterOwnerId(enterText);
  }
  function takeImageHandler(imageUri) {
    setPickedImage(imageUri);
  }

  const takeLocationHandler = useCallback((location) => {
    setPicketLocation(location);
  }, []);

  // function savedDataInp() {
  //   const parkingData = new Parking(
  //     enterTitle,
  //     pickedImage,
  //     enterAddress,
  //     enterDescription,
  //     enterPrice,
  //     enterOwnerId,
  //     pickedLocation
  //   );
  //   onCreateParking(parkingData);
  //   Alert.alert(`hey button : ${parkingData.imageUri}`, "Yosef");
  // }

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.title}>רוצה לפרסם את החניה ? </Text>
      <View>
        <Text style={styles.label}>כותרת</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enterTitle}
        />
      </View>
      <View>
        <Text style={styles.label}>כתובת (עיר , רחוב , מספר בית)</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeAddressHandler}
          value={enterAddress}
        />
      </View>
      <View>
        <Text style={styles.label}>ת"ז בעל החניה </Text>
        <TextInput
          style={styles.input}
          onChangeText={changeOwnerId}
          value={enterOwnerId}
        />
      </View>
      <View>
        <Text style={styles.label}>מחיר (לפי שעה)</Text>
        <TextInput
          style={styles.input}
          onChangeText={changePriceHandler}
          value={enterPrice}
        />
      </View>
      <View>
        <Text style={styles.label}>תיאור (מומלץ)</Text>
        <TextInput
          style={styles.DescriptionInput}
          onChangeText={changeDescHandler}
          value={enterDescription}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onTakeLocation={takeLocationHandler} />
      <View style={{display:'flex',alignItems:'center'}}>
      {/* <View style={{ marginTop: 44, width:150 ,alignItems:'center'}}>
        <Button onPress={editAvailableFunc}>Edit Availability </Button>
      </View> */}
      <View style={{ marginTop: 44, marginBottom: 50 ,width:300}}>
        <Button onPress={addParking}>שליחה</Button>
      </View>

      </View>
    </ScrollView>
  );
};

export default ParkingForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
    backgroundColor: "#e4f4f4",
    
  },
  label: {
    fontWeight: "bold",
    // marginBottom: 4,
    color: Colors.primary500,
    textAlign:'right'
  },
  input: {
    // marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary800,
    borderBottomWidth: 2,
    backgroundColor: 'white',
    textAlign:'right',
    marginBottom:16
  },
  DescriptionInput: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary800,
    borderBottomWidth: 2,
    backgroundColor: 'white',
    textAlign:'right',
    height:150,
  },
  title: {
    marginVertical: 48,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.primary500,
  },
});
