import {createContext} from 'react';
import {PlaylistType} from '../Types/Types';

type PlaylistContextType = {
  playlistPlayed: PlaylistType;
  setPlaylistPlayed: (playlist: PlaylistType) => void;
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

const PlaylistContext = createContext<PlaylistContextType>({
  playlistPlayed: playlistTemplate,
  setPlaylistPlayed: () => {},
});

export default PlaylistContext;
