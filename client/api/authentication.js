import {post} from './fetch';
import axios from 'axios';
import {API_URL} from './ApiUrl';
// export const login = (email, password) => {
//   return post('/users/login', {
//     user: {email, password},
//   });
// };

export const login = async (email, password) => {
  try {
    const res = await axios.post(
      API_URL + '/users/login',
      JSON.stringify({mail: email, password: password}),
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createAccount = async (pseudo, email, password) => {
  try {
    const res = await axios.post(
      API_URL + '/users',
      JSON.stringify({login: pseudo, mail: email, password: password}),
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
