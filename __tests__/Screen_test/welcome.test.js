import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "../../screens/WelcomeScreen"
import AuthContextProvider, { AuthContext } from "../../store/contextAuth";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import Button from "../../components/ui/Button";



// import {welcImgTest} from '../assets/welcImg'

const mockToken = "1234abcd";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));


jest.mock("expo-notifications", () => ({
  getPermissionsAsync: jest.fn().mockResolvedValue({ status: "granted" }),
  requestPermissionsAsync: jest.fn().mockResolvedValue({ status: "granted" }),
  getExpoPushTokenAsync: jest.fn().mockResolvedValue("mockedPushToken"),
  setNotificationChannelAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
}));

describe("WelcomeScreen", () => {
  beforeEach(() => {
    useNavigation.mockClear();
  });

  it("shows the correct text", async () => {
    useNavigation.mockReturnValueOnce({
      navigate: jest.fn(),
    });

    const tree = renderer.create(<WelcomeScreen />);
    const textComponent = tree.root.findByProps({ testID: "welcTestText" });

    expect(textComponent.props.children).toEqual("ברוכים הבאים !");
  });

  it("displays the correct image", () => {
    const tree = renderer.create(<WelcomeScreen />);
    const imageComponent = tree.root.findByProps({ testID: "welcomeImage" });

    // console.log(imageComponent.props.source); // Log the value of the source prop

    expect(imageComponent.props.source.testUri).toEqual(
      "../../../assets/imageWithoutBg.png"
    );
  });

  it("should render correctly with mocked AuthContext", () => {
    const mockAuthContext = { token: mockToken };
    const mockNavigation = {
      navigate: jest.fn(),
    };
    const tree = renderer.create(
      <AuthContext.Provider value={mockAuthContext}>
        <WelcomeScreen navigation={mockNavigation} />
      </AuthContext.Provider>
    );
    expect(tree.toJSON()).toMatchSnapshot();

    

  });
});

describe("Welcome Screen Navigation", () => {
  let tree;
  const mockNavigation = { navigate: jest.fn() };
  const mockAuthContext = { token: "mockToken" };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);

    tree = renderer.create(
      <AuthContext.Provider value={mockAuthContext}>
        <WelcomeScreen />
      </AuthContext.Provider>
    );
  });

  afterEach(() => {
    useNavigation.mockReset();
    mockNavigation.navigate.mockReset();
  });

  it("navigates to PersonalScreen on button press", () => {
    const button = tree.root.findByProps({ testID: "welcomeButton" });
    button.props.onPress();

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Personal", {
      token: "mockToken",
    });
  });
});
