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
