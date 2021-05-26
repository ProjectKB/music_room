import {createContext} from 'react';

const ShowPlayerContext = createContext({
  getter: [],
  setter: () => {},
});

export default ShowPlayerContext;
