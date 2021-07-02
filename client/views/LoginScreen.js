import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {login} from '../api/authentication';
import EmailForm from '../components/EmailForm';

const LoginScreen = ({navigation}) => {
  return (
    <EmailForm
      buttonText="Log in"
      onSubmit={login}
      onAuthentication={() => navigation.navigate('HomeScreen')}>
      <Button
        title="Create account"
        onPress={() => navigation.navigate('CreateAccountScreen')}
      />
    </EmailForm>
  );
};

export default LoginScreen;
