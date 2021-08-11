import axios from 'axios';
// import {API_KEY} from '@env';

export const ReadSong = async (setter, query, maxResults = 10) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?maxResults=${maxResults}&q=${query}&key=${global.api_key}&part=snippet`,
    );

    response.data != null ? setter(response.data.items) : setter([]);
  } catch (error) {
    console.log(error);
  }
};
