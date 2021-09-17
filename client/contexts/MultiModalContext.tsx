import {createContext} from 'react';

export type MultiModalStatus = '' | 'add' | 'remove' | 'delete' | 'delete song';

type MultiModal = {
  multiModalContext: MultiModalStatus;
  setMultiModalContext: (multiModalContext: MultiModalStatus) => void;
};

export const MultiModalContext = createContext<MultiModal>({
  multiModalContext: '',
  setMultiModalContext: () => {},
});

export default MultiModalContext;
