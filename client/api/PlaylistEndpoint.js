import axios from 'axios';

export const ReadAllPlaylist = async (setter, query) => {
  try {
    const response = await axios.post(
      URL + '/playlists/searchPlaylist',
      JSON.stringify(query),
    );

    response.data != null ? setter(response.data) : setter([]);
  } catch (error) {
    console.log(error);
  }
};
