import {createContext} from 'react';
import {Playlist} from '../Types/Types';

type PlaylistType = {
  playlistPlayed: Playlist;
  setPlaylistPlayed: (playlist: Playlist) => void;
};

export const playlistTemplate = {
  id: '',
  name: '',
  owner_id: '',
  status: '',
  songs: [],
  guests: [],
  has_event: false,
};

const PlaylistContext = createContext<PlaylistType>({
  playlistPlayed: playlistTemplate,
  setPlaylistPlayed: () => {},
});

export default PlaylistContext;
