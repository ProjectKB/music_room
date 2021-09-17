/* eslint-disable @typescript-eslint/no-unused-vars */
import {createContext} from 'react';
import {User} from '../types/Types';

type Auth = {
  retrieveContext: () => Promise<void>;
  signIn: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<Auth>({
  retrieveContext: async () => {},
  signIn: async (user: User) => {},
  signOut: async () => {},
});
