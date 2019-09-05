import React from 'react';
import cookies from 'js-cookie';
import Channels from './Channels';
import Messages from './Messages';
import FormNewMessage from './FormNewMessage';
import FormNewChannel from './FormNewChannel';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-12 col-sm-3">
        <p>{cookies.get('username')}</p>
        <hr />
        <h4>Channels</h4>
        <Channels />
        <hr />
        <FormNewChannel />
      </div>
      <div className="col-12 col-sm-9">
        <Messages />
        <hr />
        <FormNewMessage />
      </div>
    </div>
  </div>
);

export default App;
