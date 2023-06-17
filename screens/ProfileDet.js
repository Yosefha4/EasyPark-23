import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
  Modal,
} from "react-native";
import { Colors } from "../constants/styles";
// import { AuthContext } from "../store/contextAuth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Alert } from "react-native";
import EmailContext from "../store/emailContext";
import { async } from "@firebase/util";

export default ProfileDet = () => {
  const navigation = useNavigation();

  // const { token, isAuthenticated } = useContext(AuthContext);

  //Get email from Context API
  const emailContext = useContext(EmailContext);
  const email = emailContext.email;

  console.log(email , "wami; email")

  const [currentUuidTkn, setCurrentUuidTkn] = useState(null);

  const [currentDetails, setCurrentDetails] = useState([]);
  const [userDet, setUserDet] = useState([]);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar3.png"
  );

  const [tempCount, setTempCount] = useState(false);
  const [counterNumber, setCounterNumber] = useState(0);

  useEffect(() => {
    // Fetch the current available days from the database and update the state
    const fetchAvailableDays = async () => {
      try {
        const matchUuidToken = collection(db, "users");

        const q = query(matchUuidToken, where("userEmail", "==", email)); // Filter by matchOwnerId
        const querySnapshot = await getDocs(q);
        const availableDaysData = querySnapshot.docs.map((doc) => doc.data());

        console.log('availableDaysData:', availableDaysData);


        setCurrentUuidTkn(availableDaysData);
        updateFlag();
      } catch (error) {
        console.log("error, error", error);
      }
    };
    updateFlag();

    fetchAvailableDays();
  }, [currentDetails, counterNumber]);

  const updateStateRepeatedly = (times) => {
    let counter = 0;
    const intervalId = setInterval(() => {
      setCounterNumber((prevCount) => prevCount + 1);
      counter++;

      if (counter === times) {
        clearInterval(intervalId);
      }
    }, 3000);
  };

  useEffect(() => {
    updateStateRepeatedly(3);
  }, []);

  // console.log("currentUuidTkn, ", currentUuidTkn);
  // console.log("email, ", email);

  const handleImagePress = () => {
    setShowOptions(true);
  };

  const handleOptionSelect = (option, imageUri) => {
    setSelectedOption(option);
    setSelectedImage(imageUri);
    setShowOptions(false);
  };

  useEffect(() => {
    const dummyFunc = async () => {
      const parkingQuery = collection(db, "parkings");
      await onSnapshot(parkingQuery, (snap) => {
        let currentParking = [];
        snap.docs.map((doc) =>
          currentParking.push({ ...doc.data(), id: doc.id })
        );
        setCurrentDetails(currentParking);
      });
    };
    dummyFunc();
  }, []);

  useEffect(() => {
    if (currentDetails.length > 1 && currentUuidTkn) {
      currentDetails.forEach((item) => {
        if (item.parkingID === currentUuidTkn[0]?.userToken) {
          setUserDet(item);
          setTempCount(true)
        }
      });
    }
  }, [currentDetails, currentUuidTkn]);

  // let isUserParkingOwner = false;

  // async function updateFlad() {
  //   isUserParkingOwner = currentUuidTkn
  //     ? currentDetails.some(
  //         (detail) => detail.parkingID === currentUuidTkn[0].userToken
  //       )
  //     : false;
  // }

  console.log(currentUuidTkn,"currentUuidTkn")
  // console.log(currentDetails,"currentDetails")

  async function updateFlag() {
    // isUserParkingOwner = false;
    // console.log("currentUuidTkn               ", currentUuidTkn);
    if (currentUuidTkn && currentUuidTkn.length > 1) {
      currentDetails.forEach((detail) => {
        console.log(detail)
        // console.log(tempCount);
        // console.log(currentUuidTkn[0].userToken);
        // console.log(detail.parkingID);
        if (detail.parkingID === currentUuidTkn[0]?.userToken) {
          // isUserParkingOwner = true;
          console.log("ttttttttttttttttttttttt")
          setTempCount(true);
          // console.log("match");
          return;
        }
      });
    }
  }

  //7bdf2839-d98f-445d-a3f1-480a6775de7f
  //7bdf2839-d98f-445d-a3f1-480a6775de7f

  // const userEmail = userDet ?  userDet.ownerEmail: "id"

  // console.log(currentUuidTkn[0].userToken);
  // console.log(currentDetails[0].parkingID);
  // console.log(isUserParkingOwner);

  // console.log(currentUuidTkn[0].userToken === currentDetails[0].parkingID)

  let userCurrentToken;

  if (
    currentUuidTkn &&
    currentUuidTkn.length > 1 &&
    currentUuidTkn[0].hasOwnProperty("userToken")
  ) {
    userCurrentToken = currentUuidTkn[0]?.userToken;
  } else {
    // Handle the case when 'currentUuidTkn' is undefined or does not have 'userToken' property
    userCurrentToken = null; // Assign a default value or handle the error accordingly
  }
console.log(tempCount,"tempCount")
  const renderButtons = () => {
    // console.log("The ISUOWNERpARKING : ", tempCount);
    if (tempCount) {
      return (
        <>
          <Pressable style={styles.pressable}>
            <Button
              title="בקשה לפרסום חניה"
              color="black"
              onPress={() =>
                Alert.alert(
                  "כבר יש ברשותך חניה",
                  "לא ניתן לשלב מספר חניות למשתמש..."
                )
              }
              // onPress={() => navigation.navigate("AddParking")}
            />
          </Pressable>
          <Pressable style={styles.pressable}>
            <Button
              title="זמינות חניה"
              color="black"
              onPress={() => {
                userDet.isConfirm
                  ? navigation.navigate("EditParkingDetails", {
                      title: "",
                      userCurrentToken: userCurrentToken,
                    })
                  : Alert.alert(
                      "החניה בהמתנה לאישור המנהלים",
                      "אנא נסו שוב מאוחר יותר"
                    );
              }}
              testID="editParkBtn"
            />
          </Pressable>
          <Pressable style={styles.pressable}>
            <Button
              title=" פרטי חניה"
              color="black"
              onPress={() =>
                {navigation.navigate("EditProfileD", {
                  title: "",
                  currentUuidTkn,
                })
              console.log(currentUuidTkn,"currentUuidTkn")}
              }
            />
          </Pressable>
          <Pressable style={styles.pressable}>
            <Button
              title="דוחות"
              color="black"
              onPress={() =>
                navigation.navigate("ManageP", {
                  title: "",
                })
              }
            />
          </Pressable>
          <Pressable style={styles.pressable}>
            <Button
              title="צור קשר"
              color="black"
              onPress={() => navigation.navigate("checkOut")}
              // onPress={() => console.log("try")}
            />
          </Pressable>
        </>
      );
    } else {
      return (
        <Pressable style={styles.pressable}>
          <Button
            title="בקשה לפרסום חניה"
            color="black"
            // onPress={() => navigation.navigate("checkOut")}
            onPress={() => navigation.navigate("AddParking")}
          />
        </Pressable>
      );
    }
  };

  const parkingNotAllow = (
    <Text style={{ fontSize: 14, color: "#bfbfbf" }}>
      חניה לא זמינה כרגע , ממתינה לאישור המנהלים
    </Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable onPress={handleImagePress}>
            <Image
              style={styles.avatar}
              source={{
                uri: selectedImage,
              }}
            />
          </Pressable>
          <Text style={styles.username}>
            {userDet ? userDet.ownerName : ""}
          </Text>
          {userDet && userDet.isConfirm === false && parkingNotAllow}
        </View>

        <Modal visible={showOptions} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.optionButton}
              onPress={() =>
                handleOptionSelect(
                  "option1",
                  "https://bootdey.com/img/Content/avatar/avatar1.png"
                )
              }
            >
              <Image
                style={styles.optionImage}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar1.png",
                }}
              />
            </Pressable>
            <Pressable
              style={styles.optionButton}
              onPress={() =>
                handleOptionSelect(
                  "option2",
                  "https://bootdey.com/img/Content/avatar/avatar2.png"
                )
              }
            >
              <Image
                style={styles.optionImage}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar2.png",
                }}
              />
            </Pressable>
            <Pressable
              style={styles.optionButton}
              onPress={() =>
                handleOptionSelect(
                  "option3",
                  "https://bootdey.com/img/Content/avatar/avatar3.png"
                )
              }
            >
              <Image
                style={styles.optionImage}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar3.png",
                }}
              />
            </Pressable>
            <Button
              title="ביטול"
              onPress={() => setShowOptions(false)}
              color="white"
            />
          </View>
        </Modal>
      </View>

      <View style={styles.body}>
        <View style={styles.btnCont}>{renderButtons()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary500,
  },
  headerContent: {
    padding: 10,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#e4f4f4",
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    color: "#e4f4f4",
    marginLeft: 4,
  },
  btn: {
    marginLeft: "auto",
    width: 40,
    height: 40,
  },
  body: {
    marginTop: 24,
  },
  box: {
    padding: 5,
    marginBottom: 2,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "#e4f4f4",
    fontSize: 22,
    alignSelf: "center",
  },
  btnCont: {
    alignItems: "center",
    marginTop: 36,
    shadowColor: "white",
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 6,
  },
  pressable: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    width: 250,
    marginTop: 24,
    backgroundColor: "lightblue",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  optionButton: {
    marginBottom: 10,
    borderRadius: 5,
  },
  optionImage: {
    width: 100,
    height: 100,
  },
});
