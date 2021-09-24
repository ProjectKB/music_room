import {createContext} from 'react';
import {Setter} from '../Types/Types';

export type MultiModalStatus =
  | 'hidden'
  | 'add'
  | 'remove'
  | 'delete'
  | 'delete song';

type MultiModal = {
  multiModalContext: MultiModalStatus;
  setMultiModalContext: Setter<MultiModalStatus>;
};

export const MultiModalContext = createContext<MultiModal>({
  multiModalContext: 'hidden',
  setMultiModalContext: () => {},
});

export default MultiModalContext;
