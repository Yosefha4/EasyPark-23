import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";

import ClockTimerCount from "../components/parkings/ClockTimerCount";

const ParkingDetails = ({ route }) => {
  const { parking } = route.params;

  const [isVisableModal, setIsVisableModal] = useState(false);

  const handleImageModal = () => {
    setIsVisableModal(!isVisableModal);
  };

  const navigateToParkingLocation = () => {
    if(parking.location){
      const lat = parking.location.lat; 
      const lon = parking.location.lng; 
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
  
      try {
        Linking.openURL(url);
  
      } catch (error) {
        console.log(error)
      }
    }
    else{
      console.log("error with found location")
    }


  };

  console.log(parking.location.lat)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Text style={styles.address}>{parking.address}</Text>

        <Text style={styles.price}>{parking.price}₪ / שעה</Text>

        <ClockTimerCount parking={parking} />

        <TouchableOpacity onPress={handleImageModal} testID="parking-image">
          <Image
            source={{ uri: parking.imageUri }}
            style={{ width: 200, height: 200, marginTop: 40 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToParkingLocation} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>ניווט אל החניה</Text>
        </TouchableOpacity>

        <Modal visible={isVisableModal} transparent={true} testID="modal">
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: parking.imageUri }}
              style={styles.modalImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleImageModal}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ParkingDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    //
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
  },
  address: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  price: {
    width: 120,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    marginBottom: 16,
    textAlign: "center",

    borderWidth: 1,
    borderColor: "black",
    shadowColor: "lightblue", // Match the text color
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    backgroundColor: "#e4f4f4",
  },
  mapContainer: {
    flex: 1,
    width: "100%",
    height: 300,
    marginTop: 20,
  },
  map: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    resizeMode: "cover",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImage: {
    width: 300,
    height: 300,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  navigationButton: {
    backgroundColor: "#6495ED",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  navigationButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
