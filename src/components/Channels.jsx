import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { channelsSelector } from '../selectors';
import * as actionCreators from '../actions';
import RemoveChannel from './modals/RemoveChannel';
import RenameChannel from './modals/RenameChannel';

const mapStateToProps = (state) => {
  const channels = channelsSelector(state);
  const { currentChannelId, modal } = state;

  return {
    channels,
    currentChannelId,
    modal,
  };
};

@connect(mapStateToProps, actionCreators)

class Channels extends React.Component {
  handleChoose = id => (e) => {
    e.preventDefault();

    const { setCurrentChannel } = this.props;
    setCurrentChannel({ id });
  }

  renderIcons = (id, removable) => {
    if (!removable) {
      return null;
    }

    return (
      <span>
        <a href={`#${id}`} className="text-white" onClick={this.handleEdit}>
          <FontAwesomeIcon icon={faPen} size="xs" className="mr-1" />
        </a>
        <a href={`#${id}`} className="text-white" onClick={this.handleRemove}>
          <FontAwesomeIcon icon={faTrash} size="xs" />
        </a>
      </span>
    );
  }

  renderChannel = ({ id, name, removable }) => {
    const { currentChannelId } = this.props;

    if (currentChannelId === id) {
      return (
        <li className="list-group-item d-flex pr-2 py-0 active" key={id}>
          <span className="mr-auto">{name}</span>
          {this.renderIcons(id, removable)}
        </li>
      );
    }

    return (
      <li className="list-group-item py-0" key={id}>
        <a href={`#${id}`} onClick={this.handleChoose(id)}>
          {name}
        </a>
      </li>
    );
  }

  handleRemove = () => {
    const { openModal } = this.props;
    openModal({ type: 'remove' });
  }

  handleEdit = () => {
    const { openModal } = this.props;
    openModal({ type: 'edit' });
  }

  render() {
    const { channels, modal } = this.props;
    const modalType = {
      remove: <RemoveChannel show={modal.open} />,
      edit: <RenameChannel show={modal.open} />,
    };

    return (
      <>
        <ul className="list-group">
          {channels.map(this.renderChannel).reverse()}
        </ul>
        {modalType[modal.type]}
      </>
    );
  }
}

export default Channels;
