import reducers from '../src/reducers';

test('reducers', () => {
  const state = reducers({
    channels: {
      byId: {
        1: { id: 1, name: 'general', removable: false },
        2: { id: 2, name: 'random', removable: false },
      },
      allIds: [2, 1],
    },
    currentChannel: '',
  },
  { type: 'CURRENT_CHANNEL_SET', payload: { id: 1 } });

  expect(state).toEqual({
    channels: {
      byId: {
        1: { id: 1, name: 'general', removable: false },
        2: { id: 2, name: 'random', removable: false },
      },
      allIds: [2, 1],
    },
    currentChannel: 1,
  });
});
