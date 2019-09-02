import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { messagesSelector } from '../selectors';
import * as actionCreators from '../actions';
import UserContext from '../UserContext';

const mapStateToProps = (state) => {
  const messages = messagesSelector(state);
  const { currentChannel } = state;

  return {
    messages,
    currentChannel,
  };
};

@connect(mapStateToProps, actionCreators)

class Messages extends React.Component {
  static contextType = UserContext;

  // eslint-disable-next-line consistent-return
  renderMessage = ({ author, content, channelId }) => {
    const { currentChannel } = this.props;
    const user = this.context;

    const messageClass = cn({
      'mb-3': true,
      'bg-light': user === author,
    });

    if (channelId === currentChannel) {
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

  render() {
    const { messages } = this.props;
    return (
      <div>
        {messages.map(this.renderMessage)}
      </div>
    );
  }
}

export default Messages;
