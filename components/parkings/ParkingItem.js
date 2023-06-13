import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ParkingItem = ({ parking }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("Parkingdetails", { parking });
        }}
      >
        <Text style={styles.title}>{parking.address}</Text>

        <Text style={styles.price}>{parking.price}₪ / שעה</Text>

        <Text style={{ textAlign: "right" }}>{parking.description}</Text>

        {<Image source={{ uri: parking.imageUri }} testID="parking-image" />}

        <Image
          source={{ uri: parking.imageUri }}
          style={{ width: 200, height: 200, marginTop: 24, }}
        />
      </Pressable>
    </View>
  );
};

export default ParkingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
    padding: 20,
    width: 250,
    alignItems: "flex-end",

    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#ffff",
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    borderRadius:5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "right",
  },
  price: {
    fontWeight: "bold",
    color: "#399cbd",
    marginTop: 14,
    textAlign: "right",
    marginBottom: 24,
  },
  image:{
    shadowColor:'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity:0.6,
    shadowRadius:5,
    borderRadius:5,
    backgroundColor:'black'

  }
});
