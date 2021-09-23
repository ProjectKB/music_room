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

export type PlaylistType = {
  id: string;
  name: string;
  owner_id: string;
  status: PlaylistStatus;
  songs: Song[];
  guests: Guest[];
  has_event: boolean;
};

export type Song = {
  id: string;
  picture: string;
  name: string;
  score?: number;
};

export type Guest = {
  id: string;
  login?: string;
  contributor?: boolean;
};

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type Screen = 'Playlist' | 'Search';

export type GuestStatus = 'none' | 'guest' | 'contributor';

export type PlaylistStatus = 'private' | 'public';
