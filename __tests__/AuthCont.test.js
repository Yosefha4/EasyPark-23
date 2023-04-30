import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AuthContent from "../components/Auth/AuthContent";
import FlatButton from "../components/ui/FlatButton";
import { NavigationContainer } from "@react-navigation/native";
import { create, renderer } from "react-test-renderer";

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

  it("Should navigate to welcome screen on login",  () => {
    
    const navigation = {
      navigate: jest.fn(),
    };
    
    const tree = create(
      <NavigationContainer>
      <AuthContent isLogin={false} onAuthenticate={jest.fn()} navigation={navigation} />,
      </NavigationContainer>
    );
    const instance = tree.root;
    const button = instance.findByType(FlatButton);

    button.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith("Login")
  });



  //   it('returns a token when valid email and password are provided', async () => {
  //     // Arrange
  //     const email = 'test@walla.com';
  //     const password = '123456789';
  //     const expectedToken = 'test-token';

  //     // Mock the onAuthenticate function that will be passed to AuthContent
  //     const onAuthenticateMock = jest.fn().mockReturnValue(expectedToken);

  //     // Render the AuthContent component
  //     const tree = create(
  //       <NavigationContainer>

  //       <AuthContent isLogin={true} onAuthenticate={onAuthenticateMock} />
  //       </NavigationContainer>
  //     );

  //     // Get the submitHandler function from the AuthContent component
  //     // const submitHandler = tree.root.findByProps({ testID: 'loginBtn' }).props.onPress;
  //     const submitHandler = tree.root.findByType(FlatButton).props.onPress;

  //     // Act
  //     const actualToken = await submitHandler({
  //       email: email,
  //       confirmEmail: email,
  //       password: password,
  //       confirmPassword: password,
  //     });

  //     // Assert
  //     expect(onAuthenticateMock).toHaveBeenCalledWith({ email, password });
  //     expect(actualToken).toEqual(expectedToken);
  //   });
});

// describe('AuthContent', () => {
//     it('should switch to Signup screen when button is pressed and isLogin is true', () => {
//       const navigation = {
//         replace: jest.fn(),
//       };
//       const component = create(
//         <NavigationContainer>
//           <AuthContent isLogin={true} onAuthenticate={() => {}} navigation={navigation} />
//         </NavigationContainer>
//       );
//       const instance = component.root;
//       const button = instance.findByType(FlatButton);
//       button.props.onPress();
//       expect(navigation.replace).toHaveBeenCalledWith('Signup');
//     });

//     it('should switch to Login screen when button is pressed and isLogin is false', () => {
//       const navigation = {
//         replace: jest.fn(),
//       };
//       const component = create(
//         <NavigationContainer>
//           <AuthContent isLogin={false} onAuthenticate={() => {}} navigation={navigation} />
//         </NavigationContainer>
//       );
//       const instance = component.root;
//       const button = instance.findByType(FlatButton);
//       button.props.onPress();
//       expect(navigation.replace).toHaveBeenCalledWith('Login');
//     });
//   });
