import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot ,getDoc,getDocs,query,updateDoc,where} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Mock initializeApp function
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

// Mock getFirestore function
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  onSnapshot: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  updateDoc: jest.fn(),
  where: jest.fn(),
  
}));

// Mock getStorage function
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
}));

// Create a mock Firebase configuration
const mockFirebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Mock initializeApp implementation
initializeApp.mockReturnValue({
  name: "mock-app",
  options: mockFirebaseConfig,
});

// Mock getFirestore implementation
const mockFirestore = getFirestore();
const mockCollection = collection(mockFirestore, "parkings");
const mockOnSnapshot = onSnapshot(mockCollection, jest.fn()); // You can provide a mock callback function here if needed

getFirestore.mockReturnValue(mockFirestore);
collection.mockReturnValue(mockCollection);
onSnapshot.mockReturnValue(mockOnSnapshot);

// Mock getStorage implementation
getStorage.mockReturnValue({
  // Mock Storage methods and behavior here
  // Example: ref: jest.fn().mockReturnValue({ getDownloadURL: jest.fn() }),
});

export default mockFirebaseConfig;
