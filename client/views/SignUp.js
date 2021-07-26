import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CreateUser} from '../api/AuthEndpoint';
import {FlashMessage} from '../components/FlashMessage';

const SignUp = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onChangeText = (input, setInput, inputError, setInputError) => {
    setInput(input);

    input.length === 0 && !inputError
      ? setInputError(true)
      : setInputError(false);
  };

  const validateEmail = email => {
    const mailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return mailRegex.test(email);
  };

  const handleSubmit = () => {
    if (
      login.length !== 0 &&
      password.length !== 0 &&
      mail.length !== 0 &&
      validateEmail(mail)
    ) {
      CreateUser(login, password, mail).then(res => {
        if (res === undefined) {
          FlashMessage(false, '', 'An error has occurred, please retry later!');
        } else {
          if (res.status === 201) {
            FlashMessage(
              true,
              'Creation is successfull, you can now Log In!',
              '',
            );
            navigation.navigate('SignIn');
          } else {
            FlashMessage(false, '', res.data);
          }
        }
      });
    } else {
      if (login.length === 0) {
        setLoginError(true);
      }

      if (password.length === 0) {
        setPasswordError(true);
      }

      if (mail.length === 0) {
        setMailError(true);
      } else if (!validateEmail(mail)) {
        setMailError('format');
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
        <View style={styles.inputText}>
          <TextInput
            style={styles.input}
            onChangeText={input =>
              onChangeText(input, setMail, mailError, setMailError)
            }
            value={mail}
            placeholder="email"
          />
          <Text style={styles.inputError}>
            {mailError
              ? mailError === 'format'
                ? '* invalid format'
                : "* email can't be empty"
              : ''}
          </Text>
        </View>
        <TouchableOpacity style={styles.submit} onPress={() => handleSubmit()}>
          <Text style={{fontSize: 20}}>SIGN UP</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.question}>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{color: 'white'}}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    color: 'black',
    height: 50,
    borderRadius: 50,
    fontSize: 24,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  inputText: {
    width: '70%',
    marginBottom: 7,
  },
  inputError: {
    color: '#b00012',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  submit: {
    width: '60%',
    height: 45,
    borderRadius: 50,
    backgroundColor: '#ff4884',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  question: {
    color: 'lightgray',
    marginRight: 5,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 275,
    height: 275,
  },
});
