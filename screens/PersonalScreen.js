import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./WelcomeScreen";
import DemoScreen from "./DemoScreen";

import { NavigationContainer } from "@react-navigation/native";
import AddParking from "./AddParking";
import MapScreen from "./MapScreen";
import EditParkingDetails from './EditParkingDetails'
import { Colors } from "../constants/styles";

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import ProfileDet from "./ProfileDet";

const Tab = createBottomTabNavigator();

const mapIcon =  <Icon size={24} color="white" name="movie" />


const BottomNavBar = (token) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.primary200,
      }}
    >
      <Tab.Screen name="איזור אישי" component={ProfileDet} initialParams={{currentUser:token}} options={{tabBarIcon:()=>(<Icons name="person" size={24} />)}} />
      <Tab.Screen name="מפה" component={MapScreen} options={{tabBarIcon:()=>(<Icon name="map-marker" size={24} />)}} />

      <Tab.Screen tabBarIcon={mapIcon} name="Demos" component={DemoScreen}/>
      {/* <Tab.Screen name="AddParking" component={AddParking} />
      <Tab.Screen name="EditParking" component={EditParkingDetails} /> */}
    </Tab.Navigator>
  );
};

const PersonalScreen = ({route}) => {
  const tempToken = route.params;
  return (
    <View style={styles.cont}>
      <BottomNavBar token = {tempToken} />
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
