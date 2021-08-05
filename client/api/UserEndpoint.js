import axios from 'axios';

export const FetchUserFriends = async userId => {
  try {
    const response = await axios.get(global.URL + '/users/friends/' + userId);

    return response.data;
  } catch (error) {
    return false;
  }
};
