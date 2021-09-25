import {createContext} from 'react';
import {Setter} from '../types/Types';

type ShowPlayerType = {
  showPlayer: boolean;
  setShowPlayer: Setter<boolean>;
};

const ShowPlayerContext = createContext<ShowPlayerType>({
  showPlayer: false,
  setShowPlayer: () => {},
});

export default ShowPlayerContext;
