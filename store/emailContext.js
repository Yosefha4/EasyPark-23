import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmailContext = createContext({
  email: '',
  setEmail: () => {},
});

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve email from storage when the component mounts
    getEmailFromStorage();
  }, []);

  useEffect(() => {
    // Save email to storage whenever it changes
    saveEmailToStorage(email);
  }, [email]);

  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
        // console.log('Stored email:', storedEmail);
      }
    } catch (error) {
      console.log('Error retrieving email from storage:', error);
    }
  };


  const saveEmailToStorage = async (email) => {
    try {
      await AsyncStorage.setItem('email', email);
    } catch (error) {
      console.log('Error saving email to storage:', error);
    }
  };

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export default EmailContext;
