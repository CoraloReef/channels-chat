import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import axios from 'axios';
import routes from '../../routes';
import * as actionCreators from '../../actions';

const mapStateToProps = (state) => {
  const { currentChannelId, modal } = state;

  return { currentChannelId, modal };
};

@connect(mapStateToProps, actionCreators)

class RenameChannel extends React.Component {
  handleRename = async (values) => {
    const { currentChannelId, closeModal } = this.props;
    const { channelName } = values;

    const data = {
      data: {
        attributes: { name: channelName },
      },
    };

    const url = routes.channelPath(currentChannelId);

    try {
      await axios.patch(url, data);
      closeModal();
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
  }

  render() {
    const {
      show,
      closeModal,
      handleSubmit,
      submitting,
    } = this.props;

    return (
      <Modal
        show={show}
        onHide={closeModal}
        centered
      >
        <form onSubmit={handleSubmit(this.handleRename)}>
          <Modal.Header closeButton>
            <Modal.Title>
              Rename channel
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <Field
                name="channelName"
                component="input"
                type="text"
                placeholder="Enter new channel name..."
                className="form-control"
                disabled={submitting}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="mr-3" onClick={closeModal}>Cancel</Button>
            <Button variant="success" type="submit">{submitting ? 'Renaming...' : 'Rename'}</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default reduxForm({ form: 'renameChannel' })(RenameChannel);
