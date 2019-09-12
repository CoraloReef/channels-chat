import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const { currentChannelId, modal } = state;

  return { currentChannelId, modal };
};

@connect(mapStateToProps)

class RenameChannel extends React.Component {
  handleRename = async (values) => {
    const { currentChannelId, closeModal, patchChannel } = this.props;
    const { channelName } = values;

    const channelData = {
      id: currentChannelId,
      name: channelName,
    };

    try {
      await patchChannel(channelData);
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
