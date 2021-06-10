import {createContext} from 'react';

const SearchContext = createContext({
  getter: [],
  setter: () => {},
});

export default SearchContext;
