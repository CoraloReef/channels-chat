import React from 'react';
import { render } from 'react-dom';

export default ({ channels }) => {
  render(
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-3">
          <ul>
            {channels.map(item => <li key={item.name}>{item.name}</li>)}
          </ul>
        </div>
        <div className="col-12 col-sm-9">
          Content
        </div>
      </div>
    </div>,
    document.getElementById('chat'),
  );
};
