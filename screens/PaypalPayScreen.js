import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import Feather from "react-native-vector-icons/Feather";
// import Moment from "react-moment";
import moment from "moment";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../store/contextAuth";


const PaypalPayScreen = ({ route }) => {

  const currrentParking = route.params.parking;
  const dayForCalc = route.params.item.availDays;
  const currentItem = route.params.item;
  const pushTokenId = route.params.CurrentElement;
  
  const [timeForPrice,setTimeForPrice] = useState(0);
  const [totalAmount , setTotalAmount] = useState(0);

  const { token, isAuthenticated } = useContext(AuthContext);



  useEffect(() => {
    if (dayForCalc && currrentParking) {
      calculateDuration();
      calcTotalAmount();
      // calcTotalAmount();
      // console.log("The Total is   : " + timeForPrice)
    }
  }, [dayForCalc,currrentParking]);

  useEffect(() => {
    if (dayForCalc) {
      // calculateDuration();
      calcTotalAmount();
      // sendPushNotificationHandler();
      // console.log("The Total is   : " + timeForPrice)
    }
  }, [dayForCalc,currrentParking]);


// Need to start this function when the payment done successfully ! it's update the fileds in the database
//**************************************************************************************************************** */
  // useEffect(()=>{
  //   if(currentItem){
  //   handleRentButtonPress(currentItem.id);
  //   }
  // }, [currentItem])


  console.log(currentItem.id)
  console.log(totalAmount)
  console.log(timeForPrice)
  console.log(currrentParking.price)
  console.log("currrentParking.price" , pushTokenId)



  const [showGateway, setShowGateway] = useState(false);

  const handleRentButtonPress = async (itemId) => {
    try {
      const itemRef = doc(db, "availableDates", itemId);
      await updateDoc(itemRef, { isBusy: true });
      console.log("the token is " + token);
      await updateDoc(itemRef, { rentBy: token });
      console.log("isBusy field updated successfully!");
    } catch (error) {
      console.error("Error updating isBusy field:", error);
    }
  };

  const calculateDuration = () => {
    const fromTime = moment(dayForCalc.fromTime, "HH:mm:ss");
    const untilTime = moment(dayForCalc.untilTime, "HH:mm:ss");
    const duration = moment.duration(untilTime.diff(fromTime));
    const hours = duration.hours();
    const minutes = duration.minutes();

    if(minutes>29){
      setTimeForPrice(hours + 1);
    }
    else{
      setTimeForPrice(hours)
    }

    console.log(`Duration: ${hours} hours and ${minutes} minutes`);
    // console.log(minutes)
    // console.log(timeForPrice)
  };

  const calcTotalAmount = () =>{
    let amount = 0;
    if(timeForPrice !== 0 && currrentParking.price !== 0){
      amount = timeForPrice * currrentParking.price;
      setTotalAmount(amount);
      console.log(totalAmount + "  <  - - - -  >   Total Amount");
    }
  }



  //step 2
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState("#000");

 async function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);

    let payment = JSON.parse(data);
    if (payment.status === "COMPLETED") {
      alert("התשלום בוצע בהצלחה !");

      try {
        await handleRentButtonPress(currentItem.id)
        await sendPushNotificationHandler();
      } catch (error) {
        console.log(error)
      }

    } else {
      alert("התשלום נכשל. אנא נסה שוב מאוחר יותר.");
    }
  }

 async function sendPushNotificationHandler() {
   await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // to: "ExponentPushToken[***]",
        to: `${pushTokenId}`,
        title: "עדכון מ - EasyPark",
        body: "מישהו השכיר את החניה שלך !",
        sound: "default", // Specify the sound for the notification
      }),
    });
  }

  return (
    <View style={styles.container}>
     {totalAmount !== 0 && <Text style={{marginBottom:24, fontWeight:'bold'}}> סך הכל לתשלום : {totalAmount} ₪ </Text>}
      <View style={styles.btnCon}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setShowGateway(!showGateway)}
        >
          <Text style={styles.btnTxt}>מעבר לדף התשלום</Text>
        </TouchableOpacity>
      </View>
      {showGateway && (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType="fade"
          transparent
        >
          <View style={styles.modalContainer}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{ padding: 13 }}
                onPress={() => setShowGateway(false)}
              >
                <Feather name="x" size={24} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>PayPal Gateway</Text>
              <View style={{ padding: 13 }}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{
                uri:
                  "***" +
                  timeForPrice * currrentParking.price,
              }}
              style={{ flex: 1 }}
              onLoadStart={() => {
                setProg(true);
                setProgClr("#000");
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr("#00457C");
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              onMessage={onMessage}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default PaypalPayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCon: {
    height: 45,
    width: "70%",
    elevation: 1,
    backgroundColor: "#00457C",
    borderRadius: 3,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    color: "#fff",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: "20%",
    marginBottom: "10%",
  },
  wbHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 5,
  },
  modalTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#00457C",
  },
  webView: {
    flex: 1,
  },
});
