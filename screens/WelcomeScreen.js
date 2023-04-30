import axios from "axios";
import { useContext, useEffect, useState } from "react";

import {  Alert, Image, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/contextAuth";

import Button from '../components/ui/Button';


import welcImg from "../assets/imageWithoutBg.png";
import { useNavigation } from "@react-navigation/native";



function WelcomeScreen() {
  const [fetchMessage, setFetchMessage] = useState("");

  const navigation =  useNavigation()


  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //        await axios
  //         .get(
  //           "https://easypark-react-native-default-rtdb.firebaseio.com/message.json?auth=" +
  //             token
  //         )
  //         .then((response) => {
  //           setFetchMessage(response.data);
  //         });
  //     } catch (error) {
  //       // Alert.alert("Something get wrong...")
  //       console.log(error);
  //       // console.log("error");
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <View style={styles.rootContainer}>
      <Text testID="welcTestText" style={styles.title}>ברוכים הבאים !</Text>

      <View style={styles.image_container}>
        <Image style={styles.image} source={welcImg} testID="welcomeImage" />
      </View>

      <Button testID='welcomeButton' onPress={()=> navigation.navigate('Personal', {token})} >המשך         </Button>

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
    // position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    position: "absolute",
    // marginBottom: 0,
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
