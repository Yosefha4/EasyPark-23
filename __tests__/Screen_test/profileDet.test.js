import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileDet from "../../screens/ProfileDet"
import { useNavigation } from "@react-navigation/native";
import debugDeep from "@testing-library/react-native/build/helpers/debugDeep";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("ProfileDet", () => {
//   beforeEach(() => {
//     useNavigation.mockReturnValue(mockNavigation);
//   });
//   afterEach(() => {
//     useNavigation.mockReset();
//     mockNavigation.navigate.mockReset();
//   });

  it("should render the correct buttons when isUserParkingOwner is true", () => {
    const navigation = {
      navigate: jest.fn(),
    };
    //   const { getByText } = render(
    //     <ProfileDet navigation={navigation} isUserParkingOwner={true} />
    //   );

    //   // Check if the "בקשה לפרסום חניה" button is rendered
    //   const addParkingButton = getByText('בקשה לפרסום חניה');
    //   expect(addParkingButton).toBeDefined();

    const { queryAllByText } = render(
      <ProfileDet navigation={navigation} isUserParkingOwner={true} />
    );

    // Check if the "בקשה לפרסום חניה" button is rendered
    expect(queryAllByText("בקשה לפרסום חניה")).toBeTruthy();

    // Check if the "זמינות חניה" button is rendered
    expect(queryAllByText("זמינות חניה")).toBeTruthy();

    // Check if the "פרטי חניה" button is rendered
    expect(queryAllByText("פרטי חניה")).toBeTruthy();

    // Check if the "דוחות" button is rendered
    expect(queryAllByText("דוחות")).toBeTruthy();

    // Check if the "צור קשר" button is rendered
    expect(queryAllByText("צור קשר")).toBeTruthy();
  });

  it("should render the correct buttons when isUserParkingOwner is false", () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { queryByText } = render(
      <ProfileDet navigation={navigation} isUserParkingOwner={false} />
    );

    // Check if the "בקשה לפרסום חניה" button is rendered
    expect(queryByText("בקשה לפרסום חניה")).toBeTruthy();

    // Check if the "זמינות חניה" button is not rendered
    expect(queryByText("זמינות חניה")).toBeNull();

    // Check if the "פרטי חניה" button is not rendered
    expect(queryByText("פרטי חניה")).toBeNull();

    // Check if the "דוחות" button is not rendered
    expect(queryByText("דוחות")).toBeNull();

    // Check if the "צור קשר" button is not rendered
    expect(queryByText("צור קשר")).toBeNull();
  });

  it('should navigate to the correct screen when "בקשה לפרסום חניה" button is pressed', () => {
    const navigateMock = jest.fn();

    useNavigation.mockReturnValue({
      navigate: navigateMock,
    });

    const { getByText } = render(<ProfileDet isUserParkingOwner={true} />);

    // Simulate button press
    fireEvent.press(getByText("בקשה לפרסום חניה"));

    // Check if the navigate function is called with the correct parameters
    expect(navigateMock).toHaveBeenCalledWith("AddParking");
  });

  
});
