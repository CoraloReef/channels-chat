import React from 'react';
import axios from 'axios';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import routes from '../routes';

class FormNewChannel extends React.Component {
  handleSubmitChannel = async (values) => {
    const { reset } = this.props;
    const { channelName } = values;
    const data = {
      data: {
        attributes: { name: channelName, removable: true },
      },
    };
    const url = routes.channelsPath();

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
      <form onSubmit={handleSubmit(this.handleSubmitChannel)}>
        <div className="input-group mb-3">
          <Field
            name="channelName"
            component="input"
            type="text"
            placeholder="New channel"
            className="form-control"
            disabled={submitting}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">{submitting ? 'Creating...' : 'Create'}</button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: 'newChannel' })(FormNewChannel);
