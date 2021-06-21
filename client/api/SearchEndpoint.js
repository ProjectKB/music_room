import axios from 'axios';

export const ReadSong = async (setter, query, maxResults = 10) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?maxResults=${maxResults}&q=${query}&key=AIzaSyC2Kt0YzhTIXATbXvq77Y-MM2w7q6bmwb4&part=snippet`,
    );

    response.data != null ? setter(response.data.items) : setter([]);
  } catch (error) {
    console.log(error);
  }
};
