import {createContext} from 'react';
import {User} from '../Types/Types';

type UserType = {
  user: User;
  setUser: (user: User) => void;
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
