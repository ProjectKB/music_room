import {createContext} from 'react';

const SongIndexContext = createContext({
  getter: [],
  setter: () => {},
});

export default SongIndexContext;
