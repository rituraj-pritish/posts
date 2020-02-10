import { store } from 'react-notifications-component';

export default (message, type) => {
  let title;
  switch (type) {
    case 'danger':
      title = 'Error';
      break;
    case 'success':
      title = 'Success';
      break;
    default:
      title = '';
  }
  const notification = {
    title: title,
    insert: 'top',
    container: 'bottom-center',
    dismiss: {
      duration: 2000
    },
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut']
  };

  store.addNotification({
    ...notification,
    message: message,
    type: type
  });

  return { type: 'set_alert' };
};
