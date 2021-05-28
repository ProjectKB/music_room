import {createContext} from 'react';

const EventSearchContext = createContext({
  getter: [],
  setter: () => {},
});

export default EventSearchContext;
