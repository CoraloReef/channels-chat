import { createSelector } from 'reselect';

const getChannelById = state => state.channels.byId;
const getChannelIds = state => state.channels.allIds;

export const channelsSelector = createSelector(
  [getChannelById, getChannelIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);
