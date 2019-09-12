import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addMessage = createAction('MESSAGE_ADD');
export const addChannel = createAction('CHANNEL_ADD');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const renameChannel = createAction('CHANNEL_RENAME');
export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');

export const openModal = createAction('MODAL_OPEN');
export const closeModal = createAction('MODAL_CLOSE');

export const postMessage = messageData => async () => {
  const data = {
    data: {
      attributes: messageData,
    },
  };
  const url = routes.channelMessagesPath(messageData.channelId);

  await axios.post(url, data);
};

export const postChannel = channelData => async () => {
  const data = {
    data: {
      attributes: channelData,
    },
  };
  const url = routes.channelsPath();

  await axios.post(url, data);
};

export const deleteChannel = channelId => async () => {
  const url = routes.channelPath(channelId);

  await axios.delete(url);
};

export const patchChannel = channelData => async () => {
  const data = {
    data: {
      attributes: channelData,
    },
  };
  const url = routes.channelPath(channelData.id);

  await axios.patch(url, data);
};
