import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import Button from "../components/ui/Button";
import ImagePicker from "../components/parkings/ImagePicker";
import { Alert } from "react-native";
import LocationPicker from "../components/parkings/LocationPicker";
import { Colors } from "../constants/styles";
import { getAddress } from "../utils/auth";

const StepThreeParking = () => {
  const [pickedLocation, setPickedLocation] = useState()

  const takeLocationHandler = useCallback((location)=> {
    // getAddress(pickedLocation.lat,pickedLocation.lng)
    setPickedLocation(location)
  }, [])

  return (
    <View style={styles.container}>
              <Text style={styles.title}>Add Your Location </Text>

      <LocationPicker onTakeLocation={takeLocationHandler} />
      <View style={{ marginTop: 24 }}>
        <Button onPress={() => Alert.alert("hey button", "Yosef")}>
          Next{" "}
        </Button>
      </View>
    </View>
  );
};

export default StepThreeParking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "lightblue",
    justifyContent: "center",
  },
  title:{
    marginVertical:28,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    fontWeight:'bold',
    fontSize:24,
    color:Colors.primary500,
  }
});
