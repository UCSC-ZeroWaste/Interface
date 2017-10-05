import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleModal} from '../../actions/view_actions';
import styles from '../../../App.scss';
import FontAwesome from 'react-fontawesome';

class EmailButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.touchscreenStyle = this.props.device === 'touchscreen' ? styles.touchscreen : '';

  }

  clickHandler() {
    this.props.toggleModal('email');
  }

  render() {

    return (
      <button onClick={this.clickHandler} className={`${styles.email_button} ${this.touchscreenStyle}`}>
        Take Action
      </button>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  device: state.currentView.device,
});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (type) => dispatch(toggleModal(type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(EmailButton);
