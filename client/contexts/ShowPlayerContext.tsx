import {createContext} from 'react';

type ShowPlayerType = {
  showPlayer: boolean;
  setShowPlayer: (showPlayer: boolean) => void;
};

const ShowPlayerContext = createContext<ShowPlayerType>({
  showPlayer: false,
  setShowPlayer: () => {},
});

export default ShowPlayerContext;
