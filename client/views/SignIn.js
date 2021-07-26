import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Login} from '../api/AuthEndpoint';
import {AuthContext} from '../contexts/AuthContext';
import {FlashMessage} from '../components/FlashMessage';

const SignIn = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const {signIn} = useContext(AuthContext);

  const onChangeText = (input, setInput, inputError, setInputError) => {
    setInput(input);

    input.length === 0 && !inputError
      ? setInputError(true)
      : setInputError(false);
  };

  const handleSubmit = () => {
    if (!passwordError && !loginError) {
      if (login.length !== 0 && password.length !== 0) {
        Login(login, password).then(res =>
          res
            ? signIn(res.data)
            : FlashMessage(res, '', 'Wrong Login/Password'),
        );
      } else if (login.length === 0 || password.length === 0) {
        if (login.length === 0) {
          setLoginError(true);
        }

        if (password.length === 0) {
          setPasswordError(true);
        }
      }
    }
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
        <View style={styles.inputText}>
          <TextInput
            style={styles.input}
            onChangeText={input =>
              onChangeText(input, setLogin, loginError, setLoginError)
            }
            value={login}
            placeholder="login"
          />
          <Text style={styles.inputError}>
            {loginError ? "* login can't be empty" : ''}
          </Text>
        </View>
        <View style={styles.inputText}>
          <TextInput
            style={styles.input}
            onChangeText={input =>
              onChangeText(input, setPassword, passwordError, setPasswordError)
            }
            value={password}
            placeholder="password"
            secureTextEntry={true}
          />
          <Text style={styles.inputError}>
            {passwordError ? "* password can't be empty" : ''}
          </Text>
        </View>
        <TouchableOpacity style={styles.submit} onPress={() => handleSubmit()}>
          <Text style={{fontSize: 20}}>SIGN IN</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.question}>Don't have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
  inputText: {
    width: '70%',
    marginBottom: 7,
  },
  input: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    color: 'black',
    height: 50,
    borderRadius: 50,
    fontSize: 24,
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
  inputError: {
    color: '#b00012',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  question: {
    color: 'lightgray',
    marginRight: 5,
  },
});
