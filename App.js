import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/contextAuth";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PersonalScreen from "./screens/PersonalScreen";
import DemoScreen from "./screens/DemoScreen";
import AddParking from "./screens/AddParking";
import MapScreen from "./screens/MapScreen";
import ParkingDetails from "./screens/ParkingDetails";
import EditParkingDetails from "./screens/EditParkingDetails";
import ProfileDet from "./screens/ProfileDet";
import EditProfileDetails from "./screens/EditProfileDetails";
import PaypalPayScreen from "./screens/PaypalPayScreen";
import ManageParking from "./screens/ManageParking";
import { Image } from "react-native";
import { EmailProvider } from "./store/emailContext";
import CheckOut from "./components/CheckOut";
import { StripeProvider } from "@stripe/stripe-react-native";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "התחברות" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "הרשמה" }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },

        headerTitle: () => (
          <Image
            source={require("./assets/easyHeader.png")}
            style={{ width: 130, height: 21 }} // Adjust the size as needed
          />
        ),
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          title: "",
        }}
      />
      <Stack.Screen
        name="Personal"
        component={PersonalScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="DemoS"
        component={DemoScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="AddParking"
        component={AddParking}
        options={{ title: "" }}
      />
      <Stack.Screen name="Map" component={MapScreen} options={{ title: "" }} />
      <Stack.Screen
        name="Profile"
        component={ProfileDet}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Parkingdetails"
        component={ParkingDetails}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="EditParkingDetails"
        component={EditParkingDetails}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="EditProfileD"
        component={EditProfileDetails}
        options={{ title: "" }}
      />
      <Stack.Screen name="Paypal" component={PaypalPayScreen} />
      <Stack.Screen name="checkOut" component={CheckOut} />
      <Stack.Screen
        name="ManageP"
        component={ManageParking}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryLogin, setIsTryLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryLogin(false);
    }

    fetchToken();
  }, []);

  // if(isTryLogin){
  //   return <AppLoading/>
  // }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <EmailProvider>
        <StripeProvider publishableKey="pk_test_51LfijuCY7aYWRarzyOMY22o9B0J5U5eacjAuUPGtp7psgqimnhppBiD6UU2axvJ5gH5fdfNFgATLdlGenz4TeQLl002rr1a3ST">

          <Root />
          </StripeProvider>
        </EmailProvider>
      </AuthContextProvider>
    </>
  );
}
