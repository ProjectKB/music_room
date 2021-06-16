import {createContext} from 'react';

const FetchContext = createContext({
  getter: [],
  setter: () => {},
});

export default FetchContext;
