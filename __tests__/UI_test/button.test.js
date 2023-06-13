import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../components/ui/Button';

describe('Button', () => {
  it('should call onPress function when the button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock}>Press Me</Button>
    );

    const button = getByText('Press Me');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});
