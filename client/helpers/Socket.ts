/* eslint-disable no-undef */

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
  conversations_id: string,
  sender_id: string,
  receiver_login: string,
) => {
  return new Blob(
    [
      JSON.stringify({
        type: 'friendship request',
        friendShipRequest: {
          conversations_id: conversations_id,
          sender_id: sender_id,
          receiver_login: receiver_login,
        },
      }),
    ],
    {
      type: 'application/json',
    },
  );
};

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
