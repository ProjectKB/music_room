import axios from 'axios';

export const FetchPlaylistList = async (setter, query) => {
  try {
    const response = await axios.post(
      global.URL + '/playlists/searchPlaylist',
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
      global.URL + '/playlists/searchSong/' + playlistId,
      JSON.stringify(query),
    );

    response.data != null ? setter(response.data) : setter([]);
  } catch (error) {
    console.log(error);
  }
};

export const CreatePlaylist = async (setter, playlistName) => {
  try {
    await axios.post(global.URL + '/playlists', JSON.stringify({name: playlistName}));

    return FetchPlaylistList(setter, '');
  } catch (error) {
    return false;
  }
};

export const DeletePlaylist = async (setter, playlistId) => {
  try {
    await axios.delete(global.URL + '/playlists/' + playlistId);

    return FetchPlaylistList(setter, '');
  } catch (error) {
    return false;
  }
};

export const DeleteSong = async (setter, playlistId, songId) => {
  try {
    await axios.put(
      global.URL + '/playlists/removeSong/' + playlistId,
      JSON.stringify({id: songId}),
    );

    return FetchPlaylistList(setter, '');
  } catch (error) {
    console.log(error);
    return false;
  }
};
