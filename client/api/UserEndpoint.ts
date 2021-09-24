import axios from 'axios';
import {NETWORK} from '@env';

export const FetchUserFriends = async (userId: string) => {
  try {
    const response = await axios.get(NETWORK + '/users/friends/' + userId);

    return response.data;
  } catch (error) {
    return false;
  }
};
