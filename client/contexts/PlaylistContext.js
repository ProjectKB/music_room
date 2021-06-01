import {createContext} from 'react';

const PlaylistContext = createContext({
  displayed: [],
  setdisplayed: () => {},
  played: [],
  setplayed: () => {},
});

export default PlaylistContext;
