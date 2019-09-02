import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import UserContext from '../UserContext';
import routes from '../routes';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const { currentChannel } = state;
  return { currentChannel };
};

export default @reduxForm({ form: 'newMessage' })
@connect(mapStateToProps, actionCreators)

class FormNewMessage extends React.Component {
  static contextType = UserContext;

  handleSubmitMessage = async (values) => {
    const { reset, currentChannel } = this.props;
    const user = this.context;
    const { message } = values;
    const data = {
      data: {
        attributes: { author: user, content: message },
      },
    };
    const url = routes.channelMessagesPath(currentChannel);

    try {
      await axios.post(url, data);
      reset();
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
            component="input"
            type="text"
            placeholder="Enter your message"
            className="form-control"
            disabled={submitting}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">{submitting ? 'Sending...' : 'Send'}</button>
          </div>
        </div>
      </form>
    );
  }
}
