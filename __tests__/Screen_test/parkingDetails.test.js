import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ParkingDetails from "../../screens/ParkingDetails";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("YourComponent", () => {
  test("displays parking details correctly", () => {
    const route = {
      params: {
        parking: {
          address: "123 Main Street",
          price: 10,
          imageUri: "testImage.png",

          // Add other properties as needed
        },
      },
    };

    const { getByText } = render(<ParkingDetails route={route} />);

    const addressText = getByText(/123 Main Street/);
    const priceText = getByText(/10/);

    expect(addressText).toBeTruthy();
    expect(priceText).toBeTruthy();
  });

  test('modal becomes visible after pressing the image', () => {
    const route = {
        params: {
          parking: {
            address: "123 Main Street",
            price: 10,
            imageUri: "testImage.png",
  
          },
        },
      };

    const { getByTestId } = render(<ParkingDetails route={route} />);

    const image = getByTestId('parking-image');
    fireEvent.press(image);

    const modal = getByTestId('modal');
    expect(modal.props.visible).toBe(true);
  });
});
