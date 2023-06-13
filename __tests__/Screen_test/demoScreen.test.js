import React from "react";
import { render, fireEvent, waitFor,findByTestId } from "@testing-library/react-native";
import DemoScreen from "../../screens/DemoScreen";

describe("DemoScreen", () => {
  it("should render the search input correctly", () => {
    const { getByPlaceholderText } = render(<DemoScreen />);
    const searchInput = getByPlaceholderText("  חיפוש חופשי");
    expect(searchInput).toBeDefined();
  });

  it("should update the search query state when the search input changes", () => {
    const { getByPlaceholderText } = render(<DemoScreen />);
    const searchInput = getByPlaceholderText("  חיפוש חופשי");
    fireEvent.changeText(searchInput, "example query");
    expect(searchInput.props.value).toBe("example query");
  });
});

// describe("DemoScreen integration tests", () => {
//   it("renders parkings that include the search input", async() => {
//     const { getByText,getByPlaceholderText,getByTestId } = render(<DemoScreen />);

//     const searchButton = getByText("חפש");
//     const textInput = getByPlaceholderText("חיפוש חופשי");

//     fireEvent.changeText(textInput,"אשדוד");
//     fireEvent.press(searchButton);

//     expect(textInput.props.value).toBe("אשדוד")


//     const flatList = await waitFor(() => getByTestId("FlatList"));

//         // expect(flatList).toBeDefined();

//     const parkings = flatList.props.data;

//     console.log(flatList)
//     console.log(parkings)

//     const foundParking = parkings.find((parking) => parking.address.includes("אשדוד"));

//     expect(foundParking).toBeDefined();
    

//   });
// });
