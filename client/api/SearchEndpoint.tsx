import axios from 'axios';
import {API_KEY} from '@env';

export const ReadSong = async (query: string, maxResults = 10) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?maxResults=${maxResults}&q=${query}&key=${API_KEY}&part=snippet`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
