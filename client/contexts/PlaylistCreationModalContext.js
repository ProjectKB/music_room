import {createContext} from 'react';

const PlaylistCreationModalContext = createContext({
  getter: [],
  setter: () => {},
});

export default PlaylistCreationModalContext;
