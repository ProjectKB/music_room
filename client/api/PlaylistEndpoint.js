import axios from 'axios';
const URL = 'http://10.19.1.129:8080';
export const FetchPlaylistList = async (setter, query) => {
  try {
    const response = await axios.post(
      URL + '/playlists/searchPlaylist',
      JSON.stringify(query),
    );
    response.data != null ? setter(response.data) : setter([]);
    return true;
  } catch (error) {
    return false;
  }
};
export const FetchPlaylistSong = async (setter, query, playlistId) => {
  try {
    const response = await axios.post(
      URL + '/playlists/searchSong/' + playlistId,
      JSON.stringify(query),
    );
    response.data != null ? setter(response.data) : setter([]);
  } catch (error) {
    console.log(error);
  }
};
export const CreatePlaylist = async (setter, playlistName) => {
  try {
    await axios.post(URL + '/playlists', JSON.stringify({name: playlistName}));
    return FetchPlaylistList(setter, '');
  } catch (error) {
    return false;
  }
};
export const DeletePlaylist = async playlistId => {
  try {
    await axios.delete(URL + '/playlists/' + playlistId);
    return true;
  } catch (error) {
    return false;
  }
};
export const DeleteSong = async (playlistId, songId) => {
  try {
    await axios.put(
      URL + '/playlists/removeSong/' + playlistId,
      JSON.stringify({id: songId}),
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const AddSong = async (playlistId, song) => {
  try {
    const response = await axios.put(
      URL + '/playlists/addSong/' + playlistId,
      JSON.stringify(song),
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};