import axios from 'axios';
import {API_KEY} from '@env';
import {Setter, Song} from '../types/Types';

export const ReadSong = async (
  setter: Setter<Song[]>,
  query: string,
  maxResults?: number,
) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?maxResults=${maxResults}&q=${query}&key=${API_KEY}&part=snippet`,
    );

    response.data != null ? setter(response.data.items) : setter([]);
  } catch (error) {
    console.log(error);
  }
};
