import {showMessage} from 'react-native-flash-message';

export const FlashMessage = (
  responseStatus: boolean,
  flashMessageSuccess: string,
  flashMessageFailure: string,
) =>
  responseStatus
    ? showMessage({
        message: flashMessageSuccess,
        type: 'success',
        animationDuration: 400,
        icon: 'auto',
      })
    : showMessage({
        message: flashMessageFailure,
        type: 'danger',
        animationDuration: 400,
        icon: 'auto',
      });
