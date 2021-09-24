import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PlaylistType, Setter, Song} from '../types/Types';
import {NETWORK} from '@env';

export const FetchPlaylistList = async (
  setter: Setter<PlaylistType[]>,
  query: string,
  scope: string,
) => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const response = await axios.post(
      NETWORK + '/playlists/searchPlaylist',
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

export const FetchPlaylistSong = async (
  setter: Setter<Song[]>,
  query: string,
  playlistId: string,
) => {
  try {
    const response = await axios.post(
      NETWORK + '/playlists/searchSong/' + playlistId,
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
      NETWORK + '/playlists/guests/' + playlistId,
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

export const CreatePlaylist = async (
  setter: Setter<PlaylistType[]>,
  playlistName: string,
  status: string,
  owner_id: string,
) => {
  try {
    await axios.post(
      NETWORK + '/playlists',
      JSON.stringify({name: playlistName, status: status, owner_id: owner_id}),
    );

    return FetchPlaylistList(setter, '', 'playlist');
  } catch (error) {
    return false;
  }
};

export const DeletePlaylist = async (playlistId: string) => {
  try {
    await axios.delete(NETWORK + '/playlists/' + playlistId);

    return true;
  } catch (error) {
    return false;
  }
};

export const DeleteSong = async (playlistId: string, songId: string) => {
  try {
    await axios.put(
      NETWORK + '/playlists/removeSong/' + playlistId,
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
      NETWORK + '/playlists/addSong/' + playlistId,
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
      NETWORK + '/playlists/addGuest/' + playlistId,
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
      NETWORK + '/playlists/removeGuest/' + playlistId,
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
      NETWORK + '/playlists/delegate/' + playlistId,
      JSON.stringify(newOwnerId),
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

export const UpdatePlaylist = async (playlistId: string, payload: string) => {
  try {
    const response = await axios.put(
      NETWORK + '/playlists/' + playlistId,
      JSON.stringify(payload),
    );

    return response.data;
  } catch (error) {
    return false;
  }
};
