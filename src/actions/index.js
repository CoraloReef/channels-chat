import { createAction } from 'redux-actions';

export const addMessage = createAction('MESSAGE_ADD');
export const addChannel = createAction('CHANNEL_ADD');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const renameChannel = createAction('CHANNEL_RENAME');
export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');

export const openModal = createAction('MODAL_OPEN');
export const closeModal = createAction('MODAL_CLOSE');
