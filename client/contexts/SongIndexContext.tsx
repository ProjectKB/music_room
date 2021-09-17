import {createContext} from 'react';

type SongIndex = {
  songIndex: number;
  setSongIndex: (songIndex: number) => void;
};

const SongIndexContext = createContext<SongIndex>({
  songIndex: -1,
  setSongIndex: () => {},
});

export default SongIndexContext;
