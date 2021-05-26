import {createContext} from 'react';

const PlaylistSongSearchContext = createContext({
  getter: [],
  setter: () => {},
});

export default PlaylistSongSearchContext;
