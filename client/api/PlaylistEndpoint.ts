import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PlaylistPayload, Setter, Song} from '../types/Types';
// import {global.URL} from '@env';

export const FetchPlaylistList = async (query: string, scope: string) => {
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

    return response.data;
  } catch (error) {
    console.log(error.response);
    return false;
  }
};

export const FetchPlaylistSong = async (
  setter: Setter<Song[]>,
  query: string,
  playlistId: string,
) => {
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

export const FetchPlaylistGuest = async (playlistId: string) => {
  try {
    const response = await axios.get(
      global.URL + '/playlists/guests/' + playlistId,
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

export const CreatePlaylist = async (
  playlistName: string,
  status: string,
  owner_id: string,
) => {
  try {
    await axios.post(
      global.URL + '/playlists',
      JSON.stringify({name: playlistName, status: status, owner_id: owner_id}),
    );

    return FetchPlaylistList('', 'playlist');
  } catch (error) {
    return false;
  }
};

export const DeletePlaylist = async (playlistId: string) => {
  try {
    await axios.delete(global.URL + '/playlists/' + playlistId);

    return true;
  } catch (error) {
    return false;
  }
};

export const DeleteSong = async (playlistId: string, songId: string) => {
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

export const AddSong = async (playlistId: string, song: Song) => {
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

export const AddGuestToPlaylist = async (
  playlistId: string,
  userId: string,
) => {
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

export const RemoveGuestFromPlaylist = async (
  playlistId: string,
  userId: string,
) => {
  try {
    const response = await axios.put(
      global.URL + '/playlists/removeGuest/' + playlistId,
      JSON.stringify({id: userId}),
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

export const DelegatePlaylist = async (
  playlistId: string,
  newOwnerId: string,
) => {
  try {
    const response = await axios.put(
      global.URL + '/playlists/delegate/' + playlistId,
      JSON.stringify(newOwnerId),
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

export const UpdatePlaylist = async (
  playlistId: string,
  payload: PlaylistPayload,
) => {
  try {
    const response = await axios.put(
      global.URL + '/playlists/' + playlistId,
      JSON.stringify(payload),
    );

    return response.data;
  } catch (error) {
    return false;
  }
};
