import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import i18n from 'i18next';
import connect from '../connect';

export default @reduxForm({ form: 'newChannel' })
@connect()

class FormNewChannel extends React.Component {
  handleSubmitChannel = async (values) => {
    const { reset, postChannel } = this.props;
    const { channelName } = values;
    const channelData = {
      name: channelName,
      removable: true,
    };

    try {
      await postChannel(channelData);
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
            placeholder={i18n.t('field new channel')}
            className="form-control"
            disabled={submitting}
            required
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              {submitting
                ? i18n.t('submit button create processing')
                : i18n.t('submit button create')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
