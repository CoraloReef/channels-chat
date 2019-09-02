import { createAction } from 'redux-actions';

export const addMessage = createAction('MESSAGE_ADD');
export const addChannel = createAction('CHANNEL_ADD');
export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');
