import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AuthContent from "../../components/Auth/AuthContent"
import FlatButton from "../../components/ui/FlatButton";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { create, renderer } from "react-test-renderer";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

// jest.mock("@react-navigation/native", () => ({
//   useNavigation: jest.fn(),
// }));

describe("<AuthContent />", () => {
  it("should change the text in the button when pressed", () => {
    let isLogin = true;
    const component = create(
      <NavigationContainer>
        <AuthContent isLogin={isLogin} onAuthenticate={{}} />
      </NavigationContainer>
    );

    const instance = component.root;

    const button = instance.findByType(FlatButton);
    expect(button.props.children).toEqual("יצירת משתמש חדש");

    isLogin = false;
    component.update(
      <NavigationContainer>
        <AuthContent isLogin={isLogin} onAuthenticate={{}} />
      </NavigationContainer>
    );

    expect(button.props.children).toEqual("כבר  יש לך חשבון ? התחבר ");
  });
});

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

describe("AuthContent Navigation", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should navigate to Signup screen when FlatButton is pressed and isLogin is true", () => {
    const component = create(
      <NavigationContainer>
        <AuthContent isLogin={true} onAuthenticate={{}} />
      </NavigationContainer>
    );

    const instance = component.root;

    const button = instance.findByType(FlatButton);

    button.props.onPress();

    expect(navigate).toHaveBeenCalledWith("Signup");
  });

  it("should navigate to Login screen when FlatButton is pressed and isLogin is false", () => {
    const component = create(
      <NavigationContainer>
        <AuthContent isLogin={false} onAuthenticate={{}} />
      </NavigationContainer>
    );

    const instance = component.root;

    const button = instance.findByType(FlatButton);

    button.props.onPress();

    expect(navigate).toHaveBeenCalledWith("Login");
  });
});
