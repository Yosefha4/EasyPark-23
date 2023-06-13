import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ImagePicker from "../../components/parkings/ImagePicker"

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: jest.fn(),
  useCameraPermissions: jest.fn(() => [
    { status: 'undetermined' }, // Update the status to 'undetermined' instead of 'UNDETERMINED'
    jest.fn().mockResolvedValue({ granted: true }),
  ]),
}));

jest.mock("@expo/vector-icons", () => ({
    Ionicons: "Ionicons", // Mock the FontAwesome component with a string
}));


describe('ImagePicker', () => {
  it('should render the ImagePicker component correctly', () => {
    const { getByTestId } = render(<ImagePicker onTakeImage={jest.fn()} />);
    const imagePickerComponent = getByTestId('image-picker-component');
    expect(imagePickerComponent).toBeDefined();
  });

});
