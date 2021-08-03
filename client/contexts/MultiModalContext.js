import {createContext} from 'react';

const MultiModalContext = createContext({
  getter: [],
  setter: () => {},
});

export default MultiModalContext;
