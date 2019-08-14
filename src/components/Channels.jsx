import React from 'react';
import { channelsSelector } from '../selectors';
import connect from '../connect';

const mapStateToProps = (state) => {
  const channels = channelsSelector(state);
  return {
    channels,
  };
};

@connect(mapStateToProps)

class Channels extends React.Component {

  renderChannel = ({ id, name }) => {
    return (
      <div className="list-group-item list-group-item-action" key={id}>
        {id} - {name}
      </div>
    );
  }

  render() {
    const { channels } = this.props;
    return (
      <div className="list-group mb-4">
        {channels.map(this.renderChannel)}
      </div>
    );
  }
}

export default Channels;
