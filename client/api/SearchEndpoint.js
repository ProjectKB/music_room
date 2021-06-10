import axios from 'axios';

export const ReadSong = async (setter, query) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?maxResults=10&q=${query}&key=AIzaSyDhRir6UeCgyccKbRYkj9ASk5LgVQfCK2E&part=snippet`,
    );

    response.data != null ? setter(response.data.items) : setter([]);
  } catch (error) {
    console.log(error);
  }
};
