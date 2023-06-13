import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../utils/auth";
import { AuthContext } from "../store/contextAuth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import uuid from 'react-native-uuid';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [uniqueToken, setUniqueToken] = useState("");

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getUniqueToken();
  }, []);

  async function addUserTokenDoc(userEmail, userToken) {
    try {
      const userNtoken = collection(db, "users");
      await addDoc(userNtoken, {
        userEmail: userEmail,
        userToken: userToken,
      });
      Alert.alert("משתמש נוצר בהצלחה!");
    } catch (error) {
      console.log("The error",error);
      Alert.alert("משהו השתבש...", " אנא נסה שוב מאוחר יותר או צור איתנו קשר ");
    }
  }

  async function getUniqueToken() {
    const token = await uuid.v4();

    setUniqueToken(token);
  }

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token= await createUser(email, password);
      authCtx.authenticate(token);
      console.log("user create successfully !");
      console.log("The UUID token is : ", uniqueToken);
      await addUserTokenDoc(email, uniqueToken);
      Alert.alert("הרישום בוצע בהצלחה !");
      // await addUserTokenDoc(token,email);
    } catch (error) {
      console.log("SignUpScreen Error!", error);
      Alert.alert(
        "אימות נכשל!",
        "לא ניתן ליצור משתמש, אנא בדוק את הנתונים שהזנת או נסה שוב מאוחר יותר."
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." testID="loading" />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
