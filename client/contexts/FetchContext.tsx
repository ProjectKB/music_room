import {createContext} from 'react';

type Fetch = {
  mustFetch: boolean;
  setMustFetch: (mustFetch: boolean) => void;
};

const FetchContext = createContext<Fetch>({
  mustFetch: false,
  setMustFetch: () => {},
});

export default FetchContext;
