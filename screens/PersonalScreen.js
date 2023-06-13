import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DemoScreen from "./DemoScreen";


import MapScreen from "./MapScreen";
import { Colors } from "../constants/styles";

import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/Ionicons";
import ProfileDet from "./ProfileDet";

const Tab = createBottomTabNavigator();


const BottomNavBar = (token) => {
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    try {
      setUserToken(token);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.primary200,
      }}
    >
      <Tab.Screen
        name="מפה"
        component={MapScreen}
        initialParams={{ currentUser: token }}
        options={{ tabBarIcon: () => <Icon name="map-marker" size={24} /> }}
      />

      <Tab.Screen
        name="חיפוש חניה"
        component={DemoScreen}
        options={{ tabBarIcon: () => <Icons name="search" size={24} /> }}
      />

      <Tab.Screen
        name="איזור אישי"
        component={ProfileDet}
        initialParams={{ currentUser: token }}
        options={{ tabBarIcon: () => <Icons name="person" size={24} /> }}
      />
    </Tab.Navigator>
  );
};

const PersonalScreen = ({ route }) => {
  const tempToken = route.params.token;
  return (
    <View style={styles.cont}>
      <BottomNavBar token={tempToken} />
    </View>
  );
};

export default PersonalScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  map: {
    flex: 1,
  },
});
