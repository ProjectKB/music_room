import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, Button, Text} from 'react-native';
import {setToken} from '../api/token';

const CreateForm = ({buttonText, onSubmit, children, onAuthentication}) => {
  const [login, onChangeLogin] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = () => {
    onSubmit(login, email, password)
      .then(async res => {
        await setToken(res.token);
        onAuthentication();
      })
      .catch(res => {
        if (res && res.error) {
          setErrorMessage(res.error);
        }
        setErrorMessage('token not find.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeLogin(text)}
        value={login}
        placeholder="login"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeEmail(text)}
        value={email}
        keyboardType="email-address"
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangePassword(text)}
        value={password}
        secureTextEntry
        placeholder="password"
      />
      <Button title={buttonText} onPress={submit} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
  },
});

export default CreateForm;
