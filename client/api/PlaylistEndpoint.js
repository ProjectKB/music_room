import axios from 'axios';

const URL = 'http://192.168.0.20:8080';

export const ReadAllPlaylist = async setter => {
  try {
    const response = await axios.get(URL + '/playlists', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });
    if (response.data != null) {
      setter(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};
