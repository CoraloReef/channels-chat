import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, SubmissionError } from 'redux-form';
import i18n from 'i18next';
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
            {i18n.t('modal remove title')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{i18n.t('modal remove body')}</p>
        </Modal.Body>
        <Modal.Footer>
          <form onSubmit={handleSubmit(this.handleRemove)}>
            <Button className="mr-3" onClick={closeModal}>{i18n.t('modal close button')}</Button>
            <Button variant="danger" type="submit">
              {submitting
                ? i18n.t('modal submit button remove processing')
                : i18n.t('modal submit button remove')}
            </Button>
          </form>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default reduxForm({ form: 'removeChannel' })(RemoveChannel);
