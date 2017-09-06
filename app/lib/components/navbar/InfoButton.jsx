import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleViewSelect, handleSiteSelect, handleScopeSelect, toggleModal} from '../../actions/view_actions';
import styles from '../../../App.css';
import FontAwesome from 'react-fontawesome';

class InfoButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.toggleModal();
  }

  render() {
    return (
      <div onClick={this.clickHandler} className={styles.info_button}>
        More Info
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
  mapDispatchToProps)(InfoButton);
