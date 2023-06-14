import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Colors } from "../../constants/styles";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Alert } from "react-native";
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "../../store/contextAuth";
import EmailContext from "../../store/emailContext";

const ParkingForm = () => {
  const [pickedImage, setPickedImage] = useState();
  const [pickedLocation, setPicketLocation] = useState();

  const [enterAddress, setEnterAddress] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterOwnerId, setEnterOwnerId] = useState("");
  const [enterOwnerName, setEnterOwnerName] = useState("");
  // const [enterEmail, setEnterEmail] = useState("");
  const [userTokenEn, setUserTokemEn] = useState("");
  const [tempCount, setTempCount] = useState(0);

  // const { token, isAuthenticated } = useContext(AuthContext);

  const emailContext = useContext(EmailContext);
  const email = emailContext.email;

  useEffect(()=>{
    takeLocationHandler();
    funcToReturnID();
  },[,tempCount,pickedLocation])

  const updateStateRepeatedly = (times) => {
    let counter = 0;
    const intervalId = setInterval(() => {
      setTempCount((prevCount) => prevCount + 1);
      counter++;

      if (counter === times) {
        clearInterval(intervalId);
      }
    }, 3000);
  };

  useEffect(() => {
    updateStateRepeatedly(4);
  }, []);


  async function addParking() {
    try {
      const parkingDb = collection(db, "parkings");
      await addDoc(parkingDb, {
        address: enterAddress,
        description: enterDescription,
        imageUri: pickedImage,
        location: pickedLocation ? { lat: pickedLocation.lat, lng: pickedLocation.lng } : null,
        // location: { lat: pickedLocation.lat, lng: pickedLocation.lng },
      
        ownerParkingId: enterOwnerId,
        ownerName: enterOwnerName,
        ownerEmail:email,
        parkingID:  (userTokenEn ? userTokenEn : "errorParkingID"),
        // parkingID:  (enterEmail),
        // parkingID: token,
        price: enterPrice,
        isConfirm: false,
      });
      Alert.alert("בקשת שיתוף החניה שלך נשלחה ! ", "ניצור איתך קשר בהקדם . ");
    } catch (error) {
      console.log(error);
      Alert.alert("משהו השתבש...", " אנא נסה שוב מאוחר יותר או צור איתנו קשר ");
    }
  }

  

  async function funcToReturnID() {
    try {
      const usersCollection = collection(db, 'users');
      const queryRef = query(usersCollection, where('userEmail', '==', email));
      const querySnapshot = await getDocs(queryRef);
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const userId = userData.userToken; // Assuming the property is named 'id'
        setUserTokemEn(userId)
        // console.log("userID:" , userTokenEn)
        return userId;
      }
    } catch (error) {
      console.log('Error:', error);
    }
  
    return null; // Return null if the email doesn't exist or there was an error
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
  function changeOwnerName(enterText) {
    setEnterOwnerName(enterText);
  }
  function takeImageHandler(imageUri) {
    setPickedImage(imageUri);
  }
  // function takeEmailHandler(enterText) {
  //   setEnterEmail(enterText);
  // }

  const takeLocationHandler = useCallback((location) => {
    setPicketLocation(location);
  }, []);

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.title}>רוצה לפרסם את החניה ? </Text>
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
        <Text style={styles.label}>שם מלא בעל החניה</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeOwnerName}
          value={enterOwnerName}
        />
      </View>
      {/* <View>
        <Text style={styles.label}>אימייל (תואם לבעל החשבון)</Text>
        <TextInput
          style={styles.input}
          onChangeText={takeEmailHandler}
          value={enterEmail}
        />
      </View> */}
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
      <View style={{ display: "flex", alignItems: "center" }}>
        <View style={{ marginTop: 44, marginBottom: 50, width: 300 }}>
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
    color: Colors.primary500,
    textAlign: "right",
  },
  input: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary800,
    borderBottomWidth: 2,
    backgroundColor: "white",
    textAlign: "right",
    marginBottom: 16,
  },
  DescriptionInput: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary800,
    borderBottomWidth: 2,
    backgroundColor: "white",
    textAlign: "right",
    height: 150,
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
