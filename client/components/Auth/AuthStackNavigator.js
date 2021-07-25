import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../../views/SignIn';
import SignUp from '../../views/SignUp';
import FlashMessage from 'react-native-flash-message';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SignIn" children={props => <SignIn {...props} />} />
        <Stack.Screen name="SignUp" children={props => <SignUp {...props} />} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </>
  );
};

export default AuthStackNavigator;
