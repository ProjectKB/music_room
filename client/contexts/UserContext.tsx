import {createContext} from 'react';
import {Setter, User} from '../Types/Types';

type UserType = {
  user: User;
  setUser: Setter<User>;
};

export const userTemplate = {
  avatar: '',
  id: '',
  login: '',
  mail: '',
  friends: [],
  password: '',
  token: '',
};

const UserContext = createContext<UserType>({
  user: userTemplate,
  setUser: () => {},
});

export default UserContext;
