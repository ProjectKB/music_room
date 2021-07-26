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
