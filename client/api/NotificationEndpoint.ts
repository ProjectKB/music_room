import axios from 'axios';
// import {global.URL} from '@env';

export const FetchUserNotifications = async (notificationsId: string) => {
  try {
    const response = await axios.get(
      global.URL + '/notifications/' + notificationsId,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const ReadOneNotification = async (
  notificationsId: string,
  notificationId: string,
) => {
  try {
    const response = await axios.put(
      global.URL + '/notifications/readNotification/' + notificationsId,
      JSON.stringify(notificationId),
    );

    return response.data;
  } catch (error) {
    return false;
  }
};
