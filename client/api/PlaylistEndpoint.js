import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FetchPlaylistList = async (setter, query, scope) => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const response = await axios.post(
      global.URL + '/playlists/searchPlaylist',
      JSON.stringify({
        query: query,
        scope: scope,
        user_id: userId,
      }),
    );

    response.data != null ? setter(response.data) : setter([]);

    return true;
  } catch (error) {
    console.log(error.response);
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

export const CreatePlaylist = async (
  setter,
  playlistName,
  status,
  owner_id,
) => {
  try {
    await axios.post(
      global.URL + '/playlists',
      JSON.stringify({name: playlistName, status: status, owner_id: owner_id}),
    );

    return FetchPlaylistList(setter, '', 'playlist');
  } catch (error) {
    return false;
  }
};

export const DeletePlaylist = async playlistId => {
  try {
    await axios.delete(global.URL + '/playlists/' + playlistId);

    return true;
  } catch (error) {
    return false;
  }
};

export const DeleteSong = async (playlistId, songId) => {
  try {
    await axios.put(
      global.URL + '/playlists/removeSong/' + playlistId,
      JSON.stringify({id: songId}),
    );

    return true;
  } catch (error) {
    return false;
  }
};

export const AddSong = async (playlistId, song) => {
  try {
    const response = await axios.put(
      global.URL + '/playlists/addSong/' + playlistId,
      JSON.stringify(song),
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

export const AddGuestToPlaylist = async (playlistId, userId) => {
  try {
    const response = await axios.put(
      global.URL + '/playlists/addGuest/' + playlistId,
      JSON.stringify({id: userId, contributor: true}),
    );

    return response.data;
  } catch (error) {
    return false;
  }
};
