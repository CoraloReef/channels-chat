import { createSelector } from 'reselect';

const getChannelsById = state => state.channels.byId;
const getChannelsIds = state => state.channels.allIds;
const getCurrentChannel = state => state.currentChannel;

const getMessagesById = state => state.messages.byId;
const getMessagesIds = state => state.messages.allIds;

export const channelsSelector = createSelector(
  [getChannelsById, getChannelsIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const getCurrentChannelName = createSelector(
  [getChannelsById, getCurrentChannel],
  (byId, id) => byId[id].name,
);

export const messagesSelector = createSelector(
  [getMessagesById, getMessagesIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);
