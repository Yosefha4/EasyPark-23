import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditParkingDetails from '../../screens/EditParkingDetails';

jest.mock("@expo/vector-icons", () => ({
    Ionicons: "Ionicons", // Mock the FontAwesome component with a string
}));



describe('EditParkingDetails', () => {
    it('should render the EditParkingDetails component,  show the title and button', () => {
        const { getByText } = render(<EditParkingDetails />);
        const updateButton = getByText('עדכן');

        // Assert the presence of the title
        expect(getByText('עריכת פרטי חניה')).toBeTruthy();
        expect(updateButton).toBeTruthy();

        // Assert the presence of the date picker
      
        // Add more assertions as needed
      });

    //   it('should call addAvailableTimes function when the button is pressed', async () => {
    //     // Mock the addAvailableTimes function
    //     const addAvailableTimesMock = jest.fn();
    
    //     // Render the component
    //     const { getByText } = render(<EditParkingDetails addAvailableTimes={addAvailableTimesMock} />);
    
    //     // Find the button and simulate a press event
    //     const updateButton = getByText('עדכן');
    //     fireEvent.press(updateButton);
    
    //     // Wait for any asynchronous updates to occur
    //     // await waitFor(() => {});
    
    //     // Assert that the addAvailableTimes function is called
    //     // expect(addAvailableTimesMock).toHaveBeenCalled();
    //     expect(updateButton).toBeTruthy();
    
    //     // Add more assertions as needed
    //   });

});
