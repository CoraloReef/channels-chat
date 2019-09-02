import React from 'react';
import cookies from 'js-cookie';
import Channels from './Channels';
import Messages from './Messages';
import FormNewMessage from './FormNewMessage';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-12 col-sm-3">
        <p>{cookies.get('username')}</p>
        <hr />
        <h3>Channels</h3>
        <Channels />
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
