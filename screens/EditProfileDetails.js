import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { Colors } from "../constants/styles";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { AuthContext } from "../store/contextAuth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db } from "../config/firebase";

const EditProfileDetails = ({ route }) => {
  const [editPriceModalVisible, setEditPriceModalVisible] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [editImageModalVisible, setEditImageModalVisible] = useState(false);
  const [newImage, setNewImage] = useState("");

  const [currentParkingDet, setCurrentParkingDet] = useState();

  const navigation = useNavigation();

  // const { token, isAuthenticated } = useContext(AuthContext);

  const thisTokenID = route.params?.currentUuidTkn[0]?.userToken;

  useEffect(() => {
    // Fetch the current available days from the database and update the state
    const fetchCurrentParking = async () => {
      try {
        const currentParking = collection(db, "parkings");
// console.log(CurrentParkingDet)
        const q = query(currentParking, where("parkingID", "==", thisTokenID)); // Filter by matchOwnerId
        const querySnapshot = await getDocs(q);
        const availableDaysData = querySnapshot.docs.map((doc) => doc.data());

        setCurrentParkingDet(availableDaysData);
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Something went wrong...",
          " Please try again later or contact us "
        );
      }
    };

    fetchCurrentParking();
  }, []);

  console.log(thisTokenID, "TokenID");

  // useEffect(() => {
  //   console.log("The current parking det: ");
  //   console.log(currentParkingDet && currentParkingDet[0]);
  // }, [currentParkingDet]);

  const handleEditPrice = async () => {
    setEditPriceModalVisible(true);
  };

  const changeThePrice = async () => {
    if (currentParkingDet && currentParkingDet.length > 0) {
      const currentID = currentParkingDet[0].parkingID;
      const updatedPrice = newPrice;

      try {
        const parkingQuery = query(
          collection(db, "parkings"),
          where("parkingID", "==", currentID)
        );
        const parkingSnapshot = await getDocs(parkingQuery);
        if (!parkingSnapshot.empty) {
          const parkingDoc = parkingSnapshot.docs[0];
          const parkingRef = doc(db, "parkings", parkingDoc.id);

          await updateDoc(parkingRef, { price: newPrice });
          console.log("Price field updated successfully!");
          Alert.alert("מחיר החניה עודכן בהצלחה");
          setEditPriceModalVisible(false);
        } else {
          console.log("No document found with the provided parkingID.");
        }
      } catch (error) {
        console.error("Error updating price:", error);
      }
    } else {
      console.log("currentParkingDet is null or empty");
    }
  };

  const handleEditImage = () => {
    setEditImageModalVisible(true);
  };

  const handleConfirmPrice = () => {
    // Update the price in the database with the new price value
    // You can make an API call here to update the price
    // Use the value from the state (newPrice) to send the updated data to the server
    console.log("price update !");
    setEditPriceModalVisible(false);
  };

  const handleConfirmImage = () => {
    // Update the image in the database with the new image value
    // You can make an API call here to update the image
    // Use the value from the state (newImage) to send the updated data to the server
    console.log("image update !");
    setEditImageModalVisible(false);
  };

  const handlePressBtn = () => {
    navigation.navigate("Profile", {
      enterName,
      enterPhoneNumber,
    });
    Alert.alert("Success !!!" + enterName);
  };

  const handleDeleteParking = async (id) => {
    try {
      const parkingQuery = query(
        collection(db, "parkings"),
        where("parkingID", "==", currentParkingDet[0].parkingID)
      );
      const parkingSnapshot = await getDocs(parkingQuery);
      if (!parkingSnapshot.empty) {
        const parkingDoc = parkingSnapshot.docs[0];
        const parkingRef = doc(db, "parkings", parkingDoc.id);

        const parkingDocSnapshot = await getDoc(parkingRef);
        const parkingData = parkingDocSnapshot.data();
        const isConfirm = parkingData.isConfirm;

        console.log(isConfirm);

        if (isConfirm === false) {
          console.log("The parking already False ! ");
          Alert.alert(" החניה כבר לא זמינה ... ");

          return;
        }
        await updateDoc(parkingRef, { isConfirm: false });
        console.log(" parking available updated successfully!");
        Alert.alert(" החניה הוסרה בהצלחה", "מרגע זה היא לא תוצג למשתמשים");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>עריכת פרטי החניה</Text>

      {currentParkingDet ? (
        <View>
          <View style={styles.container}>
            <Text style={styles.address}>{currentParkingDet[0]?.address}</Text>

            <Text style={styles.price}>
              ₪ {currentParkingDet[0]?.price} / שעה
            </Text>

            <TouchableOpacity onPress={() => console.log("first")}>
              <Image
                source={{ uri: currentParkingDet[0]?.imageUri }}
                style={{ width: 200, height: 200, marginTop: 30 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleEditPrice} style={styles.btn}>
              <Text style={{ fontWeight: "bold" }}>עריכת מחיר</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "עריכת תמונה לא אפשרית כרגע",
                  "פונקציה זו תתאפשר בהקדם"
                )
              }
              style={styles.btn}
            >
              <Text style={{ fontWeight: "bold" }}>עריכת תמונה</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "האם אתה בטוח במחיקת החניה ?",
                "פעולה זאת אינה ניתנת לביטול !",
                [
                  ,
                  {
                    text: "ביטול",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "אישור",
                    onPress: () =>
                      handleDeleteParking(currentParkingDet[0].parkingID),

                    style: "cancel",
                  },
                ]
              );
            }}
            style={styles.fullWidthBtn}
          >
            <Text style={styles.fullWidthBtnText}>מחיקת החניה</Text>
          </TouchableOpacity>
          <Modal
            visible={editPriceModalVisible}
            animationType="slide"
            transparent
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setNewPrice}
                  value={newPrice}
                  placeholder="הזן מחיר חדש"
                  keyboardType="number-pad"
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={changeThePrice}
                    style={styles.confirmButton}
                  >
                    <Text style={styles.textBtn}>אישור</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setEditPriceModalVisible(false)}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.textBtn}>ביטול</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={editImageModalVisible}
            animationType="slide"
            transparent
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setNewImage}
                  value={newImage}
                  placeholder="הזן תמונה חדשה"
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleConfirmImage}
                    style={styles.confirmButton}
                  >
                    <Text style={styles.textBtn}>אישור</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setEditImageModalVisible(false)}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.textBtn}>ביטול</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <Text>איו חניות זמינות בבעלותך כרגע ...</Text>
      )}
    </View>
  );
};

export default EditProfileDetails;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
    backgroundColor: "#e4f4f4",
  },
  title: {
    marginVertical: 24,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.primary500,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
    textAlign: "right",
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary800,
    borderBottomWidth: 2,
    backgroundColor: "white",
    textAlign: "right",
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
    flex: 1,
    backgroundColor: "lightblue",

    borderRadius: 5,
    marginRight: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#ffff",
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  address: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 16,
  },
  price: {
    fontWeight: "bold",
    width: 120,
    color: "black", // Update to a vibrant color of your choice
    marginTop: 30,
    marginBottom: 24,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "black",
    shadowColor: "lightblue", // Match the text color
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    backgroundColor: "#e4f4f4",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
  },

  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 10,
    paddingVertical: 5,
    textAlign: "right",
  },
  textBtn: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    margin: 5,
    paddingVertical: 5,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ccc",

    borderRadius: 5,
    marginRight: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    marginRight: 8,

    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  fullWidthBtn: {
    backgroundColor: "#cce6ff",
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    shadowRadius: 6,
    shadowColor: "black",

    shadowOpacity: 1,
  },
  fullWidthBtnText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
