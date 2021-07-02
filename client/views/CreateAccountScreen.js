import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {createAccount} from '../api/authentication';
import CreateForm from '../components/CreateForm';

const CreateAccount = ({navigation}) => {
  return (
    <CreateForm
      buttonText="Sign up"
      onSubmit={createAccount}
      onAuthentication={() => navigation.navigate('LoginScreen')}>
      <Button
        title="Back to log in"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </CreateForm>
  );
};

export default CreateAccount;
