export type ChildrenReactNode = {
  children: React.ReactNode;
};

export type User = {
  avatar: string;
  id: string;
  login: string;
  mail: string;
  friends: string[];
  password: string;
  token: string;
};

export type Playlist = {
  id: string;
  name: string;
  owner_id: string;
  status: string;
  songs: string[];
  guests: string[];
  has_event: boolean;
};
