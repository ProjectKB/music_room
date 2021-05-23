import axios from 'axios';

const URL = 'http://192.168.0.20:8080';

export const ReadAllPlaylist = async (setter, query) => {
  try {
    const response = await axios.post(
      URL + '/playlists/search',
      JSON.stringify(query),
    );

    response.data != null ? setter(response.data) : setter([]);
  } catch (error) {
    console.log(error);
  }
};
