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
    this.props.toggleModal();
  }

  render() {
    return (
      <div onClick={this.clickHandler} className={styles.email_button}>
        Take Action
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: () => dispatch(toggleModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(EmailButton);
