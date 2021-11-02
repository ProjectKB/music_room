/* eslint-disable no-undef */

export const SocketJoin = (userLogin: string) => {
  return new Blob([JSON.stringify({type: 'join', messageJoin: userLogin})], {
    type: 'application/json',
  });
};

export const SocketLeave = (userLogin: string) => {
  return new Blob([JSON.stringify({type: 'leave', messageLeave: userLogin})], {
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
        type: 'message',
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
        type: 'friendship request',
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
        type: 'friendship confirmed',
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
