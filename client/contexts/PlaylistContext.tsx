import {createContext} from 'react';
import {PlaylistType, Setter} from '../types/Types';

type PlaylistContextType = {
  playlistPlayed: PlaylistType;
  setPlaylistPlayed: Setter<PlaylistType>;
};

export const playlistTemplate = {
  id: '',
  name: '',
  owner_id: '',
  status: 'public',
  songs: [],
  guests: [],
  has_event: false,
};

const PlaylistContext = createContext<PlaylistContextType>({
  playlistPlayed: playlistTemplate as PlaylistType,
  setPlaylistPlayed: () => {},
});

export default PlaylistContext;
