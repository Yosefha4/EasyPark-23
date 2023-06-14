import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { Alert, Image, StyleSheet, Text, View, Platform } from "react-native";
import { AuthContext } from "../store/contextAuth";

import Button from "../components/ui/Button";

import welcImg from "../assets/imageWithoutBg.png";
import { useNavigation } from "@react-navigation/native";

import * as Notifications from "expo-notifications";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import EmailContext from "../store/emailContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function WelcomeScreen() {
  const [currentPushToken, setCurrentPushToken] = useState("");
  const [userUidToken, setUserUidToken] = useState("");
  const [counterValue, setCounterValue] = useState(0);

  //Get email from Context API
  const emailContext = useContext(EmailContext);
  // console.log(emailContext)
  const email = emailContext.email;
  // console.log("email" ,email)

  const navigation = useNavigation();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  // const currEmail = authCtx.token;

  // useEffect(() => {
  //   configurePushNoti();
  // }, []);

  useEffect(() => {
    // Fetch the current available days from the database and update the state
    const fetchUuidToken = async () => {
      try {
        if (!email) {
          // Email is not available yet, return or handle accordingly
          return;
        }
    
        const matchUuidToken = collection(db, "users");
        const q = query(matchUuidToken, where("userEmail", "==", email));
        const querySnapshot = await getDocs(q);
    
        const availableDaysData = querySnapshot.docs.map((doc) => doc.data());
    
        setUserUidToken(availableDaysData);
        console.log(availableDaysData)
        // console.log("The user UID is:", availableDaysData[0]?.userToken);
        // console.log(userUidToken[0].userToken);
        console.log("The user EMAIL is:", email);
      } catch (error) {
        console.log("welcome screen, error", error);
      }
    };

    fetchUuidToken();
  }, [currentPushToken, counterValue]);

  const updateStateRepeatedly = (times) => {
    let counter = 0;
    const intervalId = setInterval(() => {
      setCounterValue((prevCount) => prevCount + 1);
      counter++;

      if (counter === times) {
        clearInterval(intervalId);
      }
    }, 3000);
  };

  useEffect(() => {
    updateStateRepeatedly(4);
  }, []);

  useEffect(() => {
    async function callToConfig() {
      await configurePushNoti();
    }
    callToConfig();
  }, []);

  // console.log("the the the " , userUidToken[0].userToken)

  async function configurePushNoti() {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;

    if (finalStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Permission required!", "push Noti need permission");
      return;
    }
    const pushToken = await Notifications.getExpoPushTokenAsync();
    // console.log(pushToken);
    setCurrentPushToken(pushToken);
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
  }

  // async function addUserTokenDoc(userEmail, userToken) {
  //   try {
  //     const userNtoken = collection(db, "users");
  //     await addDoc(userNtoken, {
  //       userEmail: userEmail,
  //       userToken: token,
  //     });
  //     Alert.alert("משתמש נוצר בהצלחה!");
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert("משהו השתבש...", " אנא נסה שוב מאוחר יותר או צור איתנו קשר ");
  //   }
  // }

  async function saveNotificationToken() {
    console.log("userUIDToken : " , userUidToken)
    if(userUidToken.length > 1){
      try {
        const notifications = collection(db, "pushNotif");
  
  
        const querySnapshot = await getDocs(
          query(notifications, where("userIDToken", "==", userUidToken[0].userToken))
        );
  
        if (querySnapshot.empty) {
          const userIDToken = userUidToken && userUidToken[0]?.userToken;
          const pushToken = currentPushToken || "Undefined pushToken";
          // await configurePushNoti();
          await addDoc(notifications, {
            userIDToken: userIDToken || "Undefined userIDToken",
            pushToken: pushToken,
          });
          Alert.alert("ה-Push Token נשמר בהצלחה !");
        } else {
          console.log("The token already exist ...");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("משהו השתבש...", "WELCOMESCREEN אנא נסה שוב מאוחר יותר או צור איתנו קשר ");
      }
    }

   
  }

  // console.log("TOKEN : ", token);

  return (
    <View style={styles.rootContainer}>
      <Text testID="welcTestText" style={styles.title}>
        ברוכים הבאים !
      </Text>

      <View style={styles.image_container}>
        <Image style={styles.image} source={welcImg} testID="welcomeImage" />
      </View>

      <Button
        testID="welcomeButton"
        onPress={() => {
          saveNotificationToken();
          navigation.navigate("Personal", { token });
        }}
      >
        המשך{" "}
      </Button>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  image_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "80%",
    zIndex: -1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
