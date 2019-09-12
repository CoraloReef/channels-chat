import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, SubmissionError } from 'redux-form';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const { currentChannelId, modal } = state;

  return { currentChannelId, modal };
};

@connect(mapStateToProps)

class RemoveChannel extends React.Component {
  handleRemove = async () => {
    const { currentChannelId, closeModal, deleteChannel } = this.props;

    try {
      await deleteChannel(currentChannelId);
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
        <Modal.Header closeButton>
          <Modal.Title>
            Remove channel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure want to delete this channel and all messages?</p>
        </Modal.Body>
        <Modal.Footer>
          <form onSubmit={handleSubmit(this.handleRemove)}>
            <Button className="mr-3" onClick={closeModal}>Cancel</Button>
            <Button variant="danger" type="submit">{submitting ? 'Removing...' : 'Yes'}</Button>
          </form>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default reduxForm({ form: 'removeChannel' })(RemoveChannel);
