import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/contextAuth";
import { login } from "../utils/auth";
import EmailContext from "../store/emailContext";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const emailContext = useContext(EmailContext);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);

      emailContext.setEmail(email); // Set the email value in the context
      // emailContext.setEmail(email);
      
      // console.log(email)
      authCtx.authenticate(token);
      console.log("Auth Success!")
    } catch (error) {
      Alert.alert(
        "אימות נכשל!",
        "לא ניתן להתחבר. אנא בדוק את הנתונים שלך ונסה שוב מאוחר יותר!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
