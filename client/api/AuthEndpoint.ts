import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {global.URL} from '@env';

export const Login = async (login: string, password: string) => {
  try {
    return await axios.post(
      global.URL + '/users/login',
      JSON.stringify({login: login, password: password}),
    );
  } catch (error) {
    return false;
  }
};

export const CreateUser = async (
  login: string,
  password: string,
  mail: string,
) => {
  try {
    return await axios.post(
      global.URL + '/users',
      JSON.stringify({login: login, mail: mail, password: password}),
    );
  } catch (error) {
    return error.response;
  }
};

export const DefineUser = async () => {
  try {
    let user_id = await AsyncStorage.getItem('userId');

    return await axios.get(global.URL + '/users/' + user_id);
  } catch (error) {
    return false;
  }
};
