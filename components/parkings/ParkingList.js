import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const ParkingList = ({ parkings }) => {
  const renderParking = (parking) => {
    return (
      <View>
        <Text>sdasadasdasd{parking.title}</Text>
        <Text>{parking.address}</Text>
        <Text>{parking.desc}</Text>
        <Text>{parking.price}</Text>
        <Text>{parking.imageUri}</Text>
        <Text>{parking.id}</Text>
      </View>
    );
  };

  if (!parkings || parkings.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Parking found ...</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={parkings}
      keyExtractor={(item) => item.id}
      render={({ item }) => renderParking(item)}
    />
  );
};

export default ParkingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
});
