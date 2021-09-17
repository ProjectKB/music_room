import {createContext} from 'react';

export type MultiModalStatus =
  | 'hidden'
  | 'add'
  | 'remove'
  | 'delete'
  | 'delete song';

type MultiModal = {
  multiModalContext: MultiModalStatus;
  setMultiModalContext: (multiModalContext: MultiModalStatus) => void;
};

export const MultiModalContext = createContext<MultiModal>({
  multiModalContext: 'hidden',
  setMultiModalContext: () => {},
});

export default MultiModalContext;
