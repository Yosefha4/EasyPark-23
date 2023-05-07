import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
// import AuthContextProvider from './store/contextAuth';
import AuthContextProvider, { AuthContext } from "./store/contextAuth";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import PersonalScreen from "./screens/PersonalScreen";
import DemoScreen from "./screens/DemoScreen";
import AddParking from "./screens/AddParking";
import MapScreen from "./screens/MapScreen";
import StepThreeParking from "./screens/StepThreeParking";
import ParkingDetails from "./screens/ParkingDetails";
import EditParkingDetails from "./screens/EditParkingDetails";
import ProfileDet from "./screens/ProfileDet";
import EditProfileDetails from "./screens/EditProfileDetails";


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
      <Stack.Screen name="Login" component={LoginScreen}  options={{title:'התחברות', }} />
      <Stack.Screen name="Signup" component={SignupScreen}  options={{title:'הרשמה', }} />
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
          title:''
        }}
      />
      <Stack.Screen name="Personal" component={PersonalScreen}  options={{title:'', }}/>
      <Stack.Screen name="DemoS" component={DemoScreen} options={{title:'', }} />
      <Stack.Screen name="AddParking" component={AddParking}  options={{title:'', }}/>
      <Stack.Screen name="Map" component={MapScreen} options={{title:''}} />
      <Stack.Screen name="Profile" component={ProfileDet} options={{title:'', }}  />
      <Stack.Screen name="Step3" component={StepThreeParking} options={{title:'', }} />
      <Stack.Screen name="Parkingdetails" component={ParkingDetails} options={{title:'', }} />
      <Stack.Screen name="EditParkingDetails" component={EditParkingDetails} options={{title:'', }} />
      <Stack.Screen name="EditProfileD" component={EditProfileDetails} options={{title:'', }} />
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
        <Root />
      </AuthContextProvider>
    </>
  );
}
