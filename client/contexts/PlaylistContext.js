import {createContext} from 'react';

const PlaylistContext = createContext({
  getter: [],
  setter: () => {},
});

export default PlaylistContext;
