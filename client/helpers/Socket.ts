/* eslint-disable no-undef */

import {FlashMessage} from '../components/FlashMessage';

export const JOIN = 'join';
export const LEAVE = 'leave';
export const MESSAGE = 'message';
export const FRIENDSHIP_REQUEST = 'friendship request';
export const FRIENDSHIP_CONFIRMED = 'friendship confirmed';
export const UPDATE_USER_FRIENDS = 'update user friends';
export const ERROR = 'error';

export const SocketJoin = (userLogin: string) => {
  return new Blob([JSON.stringify({type: JOIN, messageJoin: userLogin})], {
    type: 'application/json',
  });
};

export const SocketLeave = (userLogin: string) => {
  return new Blob([JSON.stringify({type: LEAVE, messageLeave: userLogin})], {
    type: 'application/json',
  });
};

export const SocketMessage = (
  conversationName: string,
  message: string,
  conversations: {},
) => {
  return new Blob(
    [
      JSON.stringify({
        type: MESSAGE,
        messageFromChat: {
          to: conversationName,
          content: message,
          conversation_id: conversations[conversationName].id,
        },
      }),
    ],
    {
      type: 'application/json',
    },
  );
};

export const SocketFriendshipRequest = (
  userId: string,
  friendLogin: string,
  friendNotificationsId: string,
) => {
  return new Blob(
    [
      JSON.stringify({
        type: FRIENDSHIP_REQUEST,
        friendShipRequest: {
          notifications_id: friendNotificationsId,
          sender_id: userId,
          receiver_login: friendLogin,
        },
      }),
    ],
    {
      type: 'application/json',
    },
  );
};

export const SocketFriendshipConfirmed = (
  userId: string,
  friendId: string,
  friendLogin: string,
  friendNotificationsId: string,
) => {
  return new Blob(
    [
      JSON.stringify({
        type: FRIENDSHIP_CONFIRMED,
        friendShipConfirmed: {
          notifications_id: friendNotificationsId,
          user_id: userId,
          friend_id: friendId,
          friend_login: friendLogin,
        },
      }),
    ],
    {
      type: 'application/json',
    },
  );
};

export const HandleSockets = {
  [JOIN]: ({data}) => console.log(data.content),
  [LEAVE]: ({data}) => console.log(data.content),
  [MESSAGE]: ({data, setNewMessage}) => setNewMessage(data.content),
  [FRIENDSHIP_REQUEST]: ({data}) => console.log(data.content),
  [FRIENDSHIP_CONFIRMED]: ({data}) => console.log(data.content),
  [UPDATE_USER_FRIENDS]: ({data, setNewFriend}) => setNewFriend(data.content),
  [ERROR]: ({data}) => FlashMessage(false, '', data.content),
};
