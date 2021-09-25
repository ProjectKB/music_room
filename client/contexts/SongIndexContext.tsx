import {createContext} from 'react';
import {Setter} from '../types/Types';

type SongIndex = {
  songIndex: number;
  setSongIndex: Setter<number>;
};

const SongIndexContext = createContext<SongIndex>({
  songIndex: -1,
  setSongIndex: () => {},
});

export default SongIndexContext;
