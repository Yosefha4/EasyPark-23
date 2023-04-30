import React from 'react';
import { create } from 'react-test-renderer';
import AuthForm from '../components/Auth/AuthForm';
import Button from '../components/ui/Button';
import Input from '../components/Auth/Input';
import { View } from 'react-native';

describe('AuthForm', () => {
  it('displays the correct button text based on isLogin prop', () => {
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
    expect(button.props.children).toEqual('התחברות');

    isLogin = false;
    component.update(
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={{}}
      />
    );

    expect(button.props.children).toEqual('הרשמה');
  });
});

// describe("Input Validation" , () => {
//   const mockSubmitHandler = jest.fn();

  // describe("Valid Input" , () => {
  //   const component = create(
  //     <View>
  //       <Input
  //         label="Email Address"
  //         onUpdateValue={() => {}}
  //         value="test@example.com"
  //         keyboardType="email-address"
  //         isInvalid={false}
  //       />
  //       <Input
  //         label="Password"
  //         onUpdateValue={() => {}}
  //         secure
  //         value="password123"
  //         isInvalid={false}
  //       />
  //     </View>,
  //   );
  //   it("render without errors" , () => {
  //     expect(component.toJSON()).toMatchSnapshot();
  //   });

  //   it('calls submit handler on button press', () => {
  //     const button = component.root.findByProps({ testID: 'loginBtn' });
  //     button.props.onPress();
  //     expect(mockSubmitHandler).toHaveBeenCalled();
  //   });

  // })
// })
