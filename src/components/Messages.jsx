import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { messagesSelector, channelsSelector } from '../selectors';
import * as actionCreators from '../actions';
import UserContext from '../UserContext';

const mapStateToProps = (state) => {
  const messages = messagesSelector(state);
  const channels = channelsSelector(state);
  const { currentChannelId } = state;

  return {
    messages,
    channels,
    currentChannelId,
  };
};

@connect(mapStateToProps, actionCreators)

class Messages extends React.Component {
  static contextType = UserContext;

  // eslint-disable-next-line consistent-return
  renderMessage = ({ author, content, channelId }) => {
    const { currentChannelId } = this.props;
    const user = this.context;

    const messageClass = cn({
      'mb-3': true,
      'bg-light': user === author,
    });

    if (channelId === currentChannelId) {
      return (
        <div className={messageClass} key={content}>
          <div>
            <b>{author}</b>
          </div>
          <div>
            {content}
          </div>
        </div>
      );
    }
  }

  getCurrentChannel = () => {
    const { channels, currentChannelId } = this.props;
    const channel = channels.filter(c => c.id === currentChannelId);
    return channel[0];
  }

  render() {
    const { messages } = this.props;
    return (
      <div>
        <h4 className="mb-4">
          #
          {this.getCurrentChannel().name}
        </h4>
        {messages.map(this.renderMessage)}
      </div>
    );
  }
}

export default Messages;
