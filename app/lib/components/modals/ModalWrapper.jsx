import EmailModal from './EmailModal.jsx';
import InfoModal from './InfoModal.jsx';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleModal} from '../../actions/view_actions';
import {EMAIL_MODAL_TIMEOUT} from '../../constants/settings';
import styles from '../../../App.scss';

class ModalWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTimer: this.modalTimeout()
    };
    this.touchHandler = this.touchHandler.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.state.modalTimer);
  }

  modalTimeout() {
    return setTimeout(
      () => this.props.toggleModal(),
      EMAIL_MODAL_TIMEOUT
    );
  }

  touchHandler(){
    clearTimeout(this.state.modalTimer);
    this.setState({
      modalTimer: this.modalTimeout()
    });
  }

  renderModal() {
    if (this.props.modalType === 'info') {
      return <InfoModal />;
    } else if (this.props.modalType === 'email') {
      return <EmailModal />;
    } else {
      return <div>Not a proper value for toggle modal.</div>;
    }
  }

  render() {
    return (
      <div className={styles.max_contain} onMouseDown={this.touchHandler}>
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modalType: state.currentView.modal,
});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (type) => dispatch(toggleModal(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);
