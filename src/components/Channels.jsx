import React from 'react';
import { connect } from 'react-redux';
import { channelsSelector } from '../selectors';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const channels = channelsSelector(state);
  const { currentChannelId } = state;

  return {
    channels,
    currentChannelId,
  };
};

@connect(mapStateToProps, actionCreators)

class Channels extends React.Component {
  handleChoose = id => (e) => {
    e.preventDefault();
    const { setCurrentChannel } = this.props;
    setCurrentChannel({ id });
  }

  renderChannel = ({ id, name }) => {
    const { currentChannelId } = this.props;

    if (currentChannelId === id) {
      return (
        <li className="list-group-item py-0 active" key={id}>
          {name}
        </li>
      );
    }

    return (
      <li className="list-group-item py-0" key={id}>
        <a href={`#${id}`} onClick={this.handleChoose(id)}>
          {name}
        </a>
      </li>
    );
  }

  render() {
    const { channels } = this.props;
    return (
      <ul className="list-group">
        {channels.map(this.renderChannel).reverse()}
      </ul>
    );
  }
}

export default Channels;
