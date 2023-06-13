import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ParkingItem from "../../components/parkings/ParkingItem";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("ParkingItem", () => {
  it("should navigate to Parkingdetails screen on press", () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    const parking = {
      address: "123 Street",
      price: 10,
      description: "Lorem ipsum",
      imageUri: "https://example.com/image.jpg",
    };

    const { getByText } = render(<ParkingItem parking={parking} />);
    const pressable = getByText(parking.address);

    fireEvent.press(pressable);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("Parkingdetails", { parking });
  });
  it("should render the correct price and image", () => {
    const parking = {
      address: "123 Street",
      price: 10,
      description: "Lorem ipsum",
      imageUri: "https://example.com/image.jpg",
    };

    const { getByText, getByTestId } = render(
      <ParkingItem parking={parking} />
    );
    const priceText = getByText(`${parking.price}₪ / שעה`);
    const image = getByTestId("parking-image");

    expect(priceText).toBeTruthy();
    expect(image.props.source.uri).toBe(parking.imageUri);
  });
});
