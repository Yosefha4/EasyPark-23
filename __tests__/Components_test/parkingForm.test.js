import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ParkingForm from "../../components/parkings/ParkingForm"
// import { OutlinedButton } from "../components/ui/OutlinedButton"; // Update the import path if necessary

jest.mock("@expo/vector-icons", () => ({
    Ionicons: "Ionicons", // Mock the FontAwesome component with a string
}));

// Mock the expo-location module
jest.mock("expo-location", () => ({
    requestForegroundPermissionsAsync: jest
      .fn()
      .mockResolvedValue({ granted: true }),
    useForegroundPermissions: jest.fn(() => [
      { status: 'undetermined' }, // Update the status to 'undetermined' instead of 'UNDETERMINED'
      jest.fn().mockResolvedValue({ granted: true }),
    ]),
    getCurrentPositionAsync: jest
      .fn()
      .mockResolvedValue({ coords: { latitude: 0, longitude: 0 } }),
  }));

  jest.mock('expo-image-picker', () => ({
    launchCameraAsync: jest.fn(),
    useCameraPermissions: jest.fn(() => [
      { status: 'undetermined' }, // Update the status to 'undetermined' instead of 'UNDETERMINED'
      jest.fn().mockResolvedValue({ granted: true }),
    ]),
  }));

describe("ParkingForm",  () => {
  it("should render the correct title", async() => {
    const { getByText } =  render(<ParkingForm />);
    await waitFor(() => {
        const title =  getByText("רוצה לפרסם את החניה ?");

        expect(title).toBeTruthy();
    })

  });

});
