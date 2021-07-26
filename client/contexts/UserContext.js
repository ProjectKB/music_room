import {createContext} from 'react';

const UserContext = createContext({
  getter: [],
  setter: () => {},
});

export default UserContext;
