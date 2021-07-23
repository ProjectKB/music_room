import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onChangeLogin = input => {
    setLogin(input);
  };

  const onChangePassword = input => {
    setPassword(input);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/img/app_logo.png')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={input => onChangeLogin(input)}
          value={login}
          placeholder="login"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => onChangePassword(input)}
          value={password}
          placeholder="password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.submit}>
          <Text style={{fontSize: 20}}>SIGN IN</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'lightgray', marginRight: 5}}>
            Don't have an account ?
          </Text>
          <TouchableOpacity>
            <Text style={{color: 'white'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={{color: 'white'}}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    color: 'black',
    width: '70%',
    height: 50,
    borderRadius: 50,
    fontSize: 24,
    marginBottom: 30,
  },
  submit: {
    width: '60%',
    height: 45,
    borderRadius: 50,
    backgroundColor: '#ff4884',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 275,
    height: 275,
  },
});
