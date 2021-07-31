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
    let user_id = await AsyncStorage.getItem('userId');

    return await axios.get(global.URL + '/users/' + user_id);
  } catch (error) {
    return false;
  }
};
