import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OutlinedButton from "../../components/ui/OutlinedButton"


jest.mock("@expo/vector-icons", () => ({
    Ionicons: "Ionicons", // Mock the FontAwesome component with a string
}));

describe('OutlinedButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <OutlinedButton onPress={() => {}} icon="checkmark">
        Press Me
      </OutlinedButton>
    );

    const button = getByText('Press Me');
    expect(button).toBeTruthy();
  });

  it('triggers onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <OutlinedButton onPress={onPressMock} icon="checkmark">
        Press Me
      </OutlinedButton>
    );

    const button = getByText('Press Me');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
