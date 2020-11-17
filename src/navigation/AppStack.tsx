import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from '../screens/Contacts/Contacts';
import ContactDetails from '../screens/ContactDetails/ContactDetails';

// Navigation stack of the entire app, here are defined all the different screens which are accessible throughout the app

const AppStack = () => {
  const App = createNativeStackNavigator();
  return (
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen name="Contacts" component={Contacts} />
      <App.Screen name="ContactDetails" component={ContactDetails} />
    </App.Navigator>
  );
};

export default AppStack;
