import axios from 'axios';
// import {global.URL} from '@env';

export const FetchUserFriends = async (userId: string) => {
  try {
    const response = await axios.get(global.URL + '/users/friends/' + userId);

    return response.data;
  } catch (error) {
    return false;
  }
};
