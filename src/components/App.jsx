import React from 'react';
import Channels from './Channels';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-12 col-sm-3"> 
        <Channels />
      </div>
      <div className="col-12 col-sm-9">
        Content
      </div>
    </div>
  </div>
);

export default App;
