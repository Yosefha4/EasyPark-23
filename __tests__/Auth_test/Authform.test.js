import React from "react";
import { create } from "react-test-renderer";
import AuthForm from "../../components/Auth/AuthForm"

import Button from "../../components/ui/Button";
import Input from "../../components/Auth/Input";
import { View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

describe("AuthForm", () => {
  it("displays the correct button text based on isLogin prop", () => {
    const submitHandler = jest.fn();
    let isLogin = true;
    const component = create(
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={{}}
      />
    );
    const instance = component.root;

    const button = instance.findByType(Button);
    expect(button.props.children).toEqual("התחברות");

    isLogin = false;
    component.update(
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={{}}
      />
    );

    expect(button.props.children).toEqual("הרשמה");
  });

  it("should show the valid inputs on Login mood", () => {
    const submitHandler = jest.fn();

    const component = create(
      <AuthForm
        isLogin={true}
        onSubmit={submitHandler}
        credentialsInvalid={{}}
      />
    );

    const instance = component.root;
    const theInputs = instance.findAllByType(Input)
    
    expect(theInputs.length).toEqual(2)

  });

  it("should show the valid inputs on SignUp mood", () => {
    const submitHandler = jest.fn();

    const component = create(
      <AuthForm
        isLogin={false}
        onSubmit={submitHandler}
        credentialsInvalid={{}}
      />
    );

    const instance = component.root;
    const theInputs = instance.findAllByType(Input)
    
    expect(theInputs.length).toEqual(4)

  });
});
