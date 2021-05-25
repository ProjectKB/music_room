import {createContext} from 'react';

const PlaylistSongsContext = createContext({
  getter: [],
  setter: () => {},
});

export default PlaylistSongsContext;
