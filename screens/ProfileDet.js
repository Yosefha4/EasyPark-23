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
import { AuthContext } from "../store/contextAuth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { Alert } from "react-native";

export default ProfileDet = () => {
  const navigation = useNavigation();

  const { token, isAuthenticated } = useContext(AuthContext);

  const [currentDetails, setCurrentDetails] = useState([]);
  const [userDet, setUserDet] = useState([]);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar3.png"
  );

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
    if (currentDetails) {
      currentDetails.forEach((item) => {
        if (item.parkingID === token) {
          setUserDet(item);
        }
      });
    }
  }, [currentDetails]);

  const isUserParkingOwner = currentDetails.some(
    (detail) => detail.parkingID === token
  );

  const userEmail = userDet ?  userDet.ownerEmail: "id"

  console.log(userEmail)


  const renderButtons = () => {
    if (isUserParkingOwner) {
      return (
        <>
          <Pressable style={styles.pressable}>
            <Button
              title="בקשה לפרסום חניה"
              color="black"
              onPress={() =>Alert.alert("כבר יש ברשותך חניה","לא ניתן לשלב מספר חניות למשתמש...")}
              // onPress={() => navigation.navigate("AddParking")}
            />
          </Pressable>
          <Pressable style={styles.pressable}>
            <Button
              title="זמינות חניה"
              color="black"
              onPress={() =>{ userDet.isConfirm ? 
                navigation.navigate("EditParkingDetails", {
                  title: "",
                }) : Alert.alert("החניה בהמתנה לאישור המנהלים" , "אנא נסו שוב מאוחר יותר")}
              }
              testID="editParkBtn"
            />
          </Pressable>
          <Pressable style={styles.pressable}>
            <Button
              title=" פרטי חניה"
              color="black"
              onPress={() =>
                navigation.navigate("EditProfileD", {
                  title: "",
                })
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
              onPress={() => console.log("try")}
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
            onPress={() => navigation.navigate("AddParking")}
          />
        </Pressable>
      );
    }
  };

  const parkingNotAllow = <Text style={{fontSize:14, color:'#bfbfbf'}}>חניה לא זמינה כרגע , ממתינה לאישור המנהלים</Text>

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
