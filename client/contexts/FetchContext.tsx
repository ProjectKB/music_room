import {createContext} from 'react';
import {Setter} from '../types/Types';

type Fetch = {
  mustFetch: boolean;
  setMustFetch: Setter<boolean>;
};

const FetchContext = createContext<Fetch>({
  mustFetch: false,
  setMustFetch: () => {},
});

export default FetchContext;
