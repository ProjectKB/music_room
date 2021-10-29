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
  senderId: string,
  receiverLogin: string,
  friendConversationsId: string,
) => {
  return new Blob(
    [
      JSON.stringify({
        type: 'friendship request',
        friendShipRequest: {
          conversations_id: friendConversationsId,
          sender_id: senderId,
          receiver_login: receiverLogin,
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
  friendConversationsId: string,
) => {
  return new Blob(
    [
      JSON.stringify({
        type: 'friendship confirmed',
        friendShipConfirmed: {
          conversations_id: friendConversationsId,
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
