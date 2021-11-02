export type ChildrenReactNode = {
  children: React.ReactNode;
};

export type User = {
  avatar: string;
  id: string;
  login: string;
  mail: string;
  friends: Friend[];
  password: string;
  token: string;
  notifications: string;
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

export type Friend = {
  id: string;
  confirmed: boolean;
  conversation: string;
};

export type PlaylistPayload = {
  name?: string;
  status?: string;
  guests?: Guest[];
};

export type Message = {
  type: string;
  from: string;
  to: string;
  content: string;
  date: string;
  success: boolean;
};

export type Conversation = {
  id: string;
  user_a: string;
  user_b: string;
  messages: Message[];
};

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type ScreenType = 'Playlist' | 'Search';

export type GuestStatus = 'none' | 'guest' | 'contributor';

export type PlaylistStatus = 'private' | 'public';

export type ChipValue = 'Global' | 'Song' | 'Playlist' | 'Event' | 'User';
