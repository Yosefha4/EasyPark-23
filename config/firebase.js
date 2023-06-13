import { initializeApp} from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1gr5GOBC-KKAHUqpZlPhVYNprk3BlOr4",
  authDomain: "easypark-react-native.firebaseapp.com",
  databaseURL: "https://easypark-react-native-default-rtdb.firebaseio.com",
  projectId: "easypark-react-native",
  storageBucket: "easypark-react-native.appspot.com",
  messagingSenderId: "499402545520",
  appId: "1:499402545520:web:8de5b0ddf3b3d4443017b5",
  measurementId: "G-PRNHRBWN9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const storage = getStorage(app);

export {app, storage};

// const analytics = getAnalytics(app);
