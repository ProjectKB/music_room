import {createContext} from 'react';

const PlaylistSearchContext = createContext({
  getter: [],
  setter: () => {},
});

export default PlaylistSearchContext;
