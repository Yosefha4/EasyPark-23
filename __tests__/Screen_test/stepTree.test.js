import React from "react";
import { render } from "@testing-library/react-native";
import StepThreeParking from "../../screens/StepThreeParking"

// Mock the MapView component
jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  const MockMapView = (props) => <View {...props} />;
  return {
    __esModule: true,
    default: MockMapView,
    PROVIDER_GOOGLE: "google",
  };
});

describe("step3Test", () => {
  test("renders step3 container& the mapView", () => {
    const { getByTestId } = render(<StepThreeParking />);

    const viewContainer = getByTestId("step3");
    const mapView = getByTestId("map-view2")

    expect(viewContainer).toBeTruthy();
    expect(mapView).toBeTruthy();
  });
  test("Should render the step3 title", () => {
    const { getByText } = render(<StepThreeParking />);

    const step3Title = getByText("Add Your Location");

    expect(step3Title).toBeTruthy();
  });
});
