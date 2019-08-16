import { createSelector } from 'reselect';

const getChannelsById = state => state.channels.byId;
const getChannelsIds = state => state.channels.allIds;
const getCurrentChannel = state => state.currentChannel;

export const channelsSelector = createSelector(
  [getChannelsById, getChannelsIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const getCurrentChannelName = createSelector(
  [getChannelsById, getCurrentChannel],
  (byId, id) => byId[id].name,
);
