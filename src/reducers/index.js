import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';


const messages = handleActions({
  [actions.addMessage](state, { payload: { message } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
  [actions.removeChannel](state, { payload: { id } }) {
    const { byId, allIds } = state;
    const removeMessages = _.pickBy(byId, { channelId: id });
    const ids = Object.keys(removeMessages).map(i => Number(i));
    return {
      byId: _.omit(byId, ids),
      allIds: _.without(allIds, ...ids),
    };
  },
}, { byId: {}, allIds: [] });

const channels = handleActions({
  [actions.addChannel](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [channel.id]: channel },
      allIds: [channel.id, ...allIds],
    };
  },
  [actions.removeChannel](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
  [actions.renameChannel](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    const { id } = channel;
    return {
      allIds,
      byId: { ...byId, [id]: channel },
    };
  },
}, { byId: {}, allIds: [] });

const currentChannelId = handleActions({
  [actions.setCurrentChannel](state, { payload: { id } }) {
    return id;
  },
}, '');

const modal = handleActions({
  [actions.openModal](state, { payload: { type } }) {
    return {
      open: true,
      type,
    };
  },
  [actions.closeModal]() {
    return {
      open: false,
    };
  },
}, { open: false, type: '' });

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  modal,
  form: formReducer,
});
