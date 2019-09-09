import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, SubmissionError } from 'redux-form';
import axios from 'axios';
import routes from '../../routes';
import * as actionCreators from '../../actions';

const mapStateToProps = (state) => {
  const { currentChannelId, modal } = state;

  return { currentChannelId, modal };
};

@connect(mapStateToProps, actionCreators)

class RemoveChannel extends React.Component {
  handleRemove = async () => {
    const { currentChannelId, closeModal } = this.props;

    const url = routes.channelPath(currentChannelId);

    try {
      await axios.delete(url);
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
