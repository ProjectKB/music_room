import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../../views/SignIn';
import FlashMessage from 'react-native-flash-message';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </>
  );
};

export default AuthStackNavigator;
