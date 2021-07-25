import axios from 'axios';

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
