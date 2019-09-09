/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import reducers from './reducers';
import App from './components/App';
import * as actions from './actions';
import UserContext from './UserContext';

const getUsername = () => {
  if (!cookies.get('username')) {
    cookies.set('username', faker.name.findName(), { expires: 1 });
  }
  return cookies.get('username');
};

export default ({ channels, messages, currentChannelId }) => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );

  const defaultChannel = 1;

  const socket = io();

  socket.on('newMessage', (message) => {
    store.dispatch(actions.addMessage({ message: message.data.attributes }));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(actions.addChannel({ channel: channel.data.attributes }));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(actions.setCurrentChannel({ id: defaultChannel }));
    store.dispatch(actions.removeChannel({ id: data.data.id }));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(actions.renameChannel({ channel: channel.data.attributes }));
  });

  messages.forEach(message => store.dispatch(actions.addMessage({ message })));
  channels.forEach(channel => store.dispatch(actions.addChannel({ channel })));
  store.dispatch(actions.setCurrentChannel({ id: currentChannelId }));

  render(
    <Provider store={store}>
      <UserContext.Provider value={getUsername()}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
