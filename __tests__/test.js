import reducers from '../src/reducers';

test('reducers', () => {
  const state = reducers({
    messages: { byId: {}, allIds: [] },
    channels: {
      byId: {
        1: { id: 1, name: 'general', removable: false },
        2: { id: 2, name: 'random', removable: false },
      },
      allIds: [2, 1],
    },
    currentChannel: 1,
    form: {},
  },
  {
    type: '@@redux-form/REGISTER_FIELD',
    meta: { form: 'newMessage' },
    payload: { name: 'message', type: 'Field' },
  });

  expect(state).toEqual({
    messages: { byId: {}, allIds: [] },
    channels: {
      byId: {
        1: { id: 1, name: 'general', removable: false },
        2: { id: 2, name: 'random', removable: false },
      },
      allIds: [2, 1],
    },
    currentChannel: 1,
    form: {
      newMessage: {
        registeredFields: {
          message: { name: 'message', type: 'Field', count: 1 },
        },
      },
    },
  });
});
