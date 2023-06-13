import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";

import { collection, onSnapshot } from "firebase/firestore";
import MapScreen from "../../screens/MapScreen";
import mockFirebaseConfig from "../../__mocks__/firebase";

import { FontAwesome } from "@expo/vector-icons"; // Import the FontAwesome component from '@expo/vector-icons'
import { initializeApp } from "firebase/app";

// import { FontAwesome as MockFontAwesome } from '../__mocks__/mockFontAwesome';
import { useNavigation } from "@react-navigation/native";
import { Marker } from "react-native-maps";

const mockSetMapRegion = jest.fn();

// Mock the expo-location module
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest
    .fn()
    .mockResolvedValue({ granted: true }),
  getCurrentPositionAsync: jest
    .fn()
    .mockResolvedValue({ coords: { latitude: 0, longitude: 0 } }),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  onSnapshot: jest.fn(),
  // Add other methods you need to mock
}));

jest.mock("@expo/vector-icons", () => ({
  FontAwesome: "FontAwesome", // Mock the FontAwesome component with a string
}));

describe("MapComponent", () => {
  beforeAll(() => {
    // Set up Firebase with the mock configuration
    initializeApp(mockFirebaseConfig);
    useNavigation.mockClear();
  });

  test("renders map view", async () => {
    const { getByTestId } = render(<MapScreen />);
    await waitFor(() => {
      const mapView = getByTestId("map-view");
      expect(mapView).toBeTruthy();
    });
    // const mapView = getByTestId("map-view");
    // expect(mapView).toBeTruthy();
  });

  test("renders zoom-in and zoom-out buttons", async () => {
    const { getByTestId } = render(<MapScreen />);

    await waitFor(() => {
      const zoomInButton = getByTestId("zoomInBtn");
      const zoomOutButton = getByTestId("zoomOutBtn");

      expect(zoomInButton).toBeTruthy();
      expect(zoomOutButton).toBeTruthy();
    });

    // Additional assertions or interaction tests can be added here
  });

  // test("navigates to ParkingDetails page with correct parking details after pressing a marker", () => {
  //   const mockParkings = [
  //     {
  //       id: 1,
  //       location: { lat: 40.123, lng: -74.456 },
  //       address: "123 Main St",
  //       price: 10,
  //     },
  //   ];

  //   const navigationMock = {
  //     navigate: jest.fn(),
  //   };

  //   const { UNSAFE_getByType } = render(
  //     <MapScreen filterParkings={mockParkings} navigation={navigationMock} />
  //   );

  //   const marker = UNSAFE_getByType("Marker");

  //   fireEvent.press(marker);

  //   expect(navigationMock.navigate).toHaveBeenCalledWith("ParkingDetails", {
  //     parking: mockParkings[0],
  //   });
  // });
});
