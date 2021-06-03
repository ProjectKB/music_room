import {showMessage} from 'react-native-flash-message';

export const FlashMessage = (
  responseStatus,
  flashMessageSuccess,
  flashMessageFailure,
) => {
  if (responseStatus) {
    showMessage({
      message: flashMessageSuccess,
      type: 'success',
      animationDuration: 400,
      icon: 'auto',
    });
  } else {
    showMessage({
      message: flashMessageFailure,
      type: 'danger',
      animationDuration: 400,
      icon: 'auto',
    });
  }
};
