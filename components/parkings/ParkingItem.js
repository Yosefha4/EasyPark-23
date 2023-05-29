import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Alert } from "react-native";

const ParkingItem = ({ parking }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          Alert.alert(
            `${parking.price}$`,
            `The Address of this parking spot is : ${parking.title}`
          )
        }
      >
        <Text style={styles.title}>{parking.address}</Text>
        {/* <Text style={styles.title}>{parking.title}</Text> */}
        {/* <Text style={{textAlign:'right'}}>{parking.address}</Text> */}
        {/* <Text>ParkingOwnerId : {parking.ownerParkingId}</Text> */}
        {/* <Text>{parking.desc}</Text> */}
        <Text style={styles.price}>{parking.price}₪ / שעה</Text>
        {/* <Text>{parking.imageUri}</Text> */}
        {/* <Text>{parking.id}</Text> */}
        <Text style={{ textAlign: "right" }}>{parking.description}</Text>

        {<Image  source={parking.imageUri}/>}

        {/* <Text>{`Location :{ lat: ${parking.location.lat} , lng: ${parking.location.lng}}`}</Text> */}
        <Image
          source={{ uri: parking.imageUri }}
          style={{ width: 200, height: 200, marginTop: 24 }}
        />
        {/* <Text>{parking.imageUri}</Text> */}
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
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
});
