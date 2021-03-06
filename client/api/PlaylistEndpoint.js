import axios from 'axios';

const URL = 'http://10.19.1.129:8080';

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
