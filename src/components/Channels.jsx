import React from 'react';
import { connect } from 'react-redux';
import { channelsSelector } from '../selectors';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const channels = channelsSelector(state);
  const { currentChannel } = state;
  return {
    channels,
    currentChannel,
  };
};

class Channels extends React.Component {
  handleChoose = (e) => {
    e.preventDefault();
  }

  renderChannel = ({ id, name }) => {
    const { currentChannel } = this.props;

    if (currentChannel === id) {
      return (
        <li className="list-group-item py-0 active" key={id}>
          {name}
        </li>
      );
    }

    return (
      <li className="list-group-item py-0" key={id}>
        <a href={`#${id}`} onClick={this.handleChoose}>
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

export default connect(mapStateToProps, actionCreators)(Channels);
