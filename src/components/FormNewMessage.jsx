import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import UserContext from '../UserContext';
import connect from '../connect';
import FormInput from './FormInput';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

export default @reduxForm({ form: 'newMessage' })
@connect(mapStateToProps)

class FormNewMessage extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.inputMessage = React.createRef();
  }

  handleSubmitMessage = async (values) => {
    const { reset, currentChannelId, postMessage } = this.props;
    const user = this.context;
    const { message } = values;
    const messageData = {
      author: user,
      content: message,
      channelId: currentChannelId,
    };

    try {
      await postMessage(messageData);
      reset();
      this.inputMessage.current.focus();
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmitMessage)}>
        <div className="input-group mb-3">
          <Field
            name="message"
            component={FormInput}
            type="text"
            placeholder="Enter your message"
            className="form-control"
            disabled={submitting}
            required
            autoFocus
            inputRef={this.inputMessage}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">{submitting ? 'Sending...' : 'Send'}</button>
          </div>
        </div>
      </form>
    );
  }
}
