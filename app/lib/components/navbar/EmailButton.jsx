import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleModal} from '../../actions/view_actions';
import styles from '../../../App.scss';
import FontAwesome from 'react-fontawesome';

class EmailButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.toggleModal('email');
  }

  render() {
    let device = this.props.device === 'touchscreen' ? styles.touchscreen : styles.desktop;

    return (
      <button onClick={this.clickHandler} className={`${styles.email_button} ${device}`}>
        Take Action!
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
