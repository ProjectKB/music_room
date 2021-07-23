import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../../views/SignIn';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
