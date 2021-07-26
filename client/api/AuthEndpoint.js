import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = async (login, password) => {
  try {
    return await axios.post(
      global.URL + '/users/login',
      JSON.stringify({login: login, password: password}),
    );
  } catch (error) {
    return null;
  }
};

export const CreateUser = async (login, password, mail) => {
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
    let token = await AsyncStorage.getItem('userToken');

    return await axios.post(
      global.URL + '/users/define',
      JSON.stringify(token),
    );
  } catch (error) {
    return false;
  }
};
