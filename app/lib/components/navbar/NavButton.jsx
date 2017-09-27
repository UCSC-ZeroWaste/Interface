import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleViewSelect, handleScopeSelect, toggleModal} from '../../actions/view_actions';
import styles from '../../../App.scss';
import FontAwesome from 'react-fontawesome';

class NavButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    // if (this.props.nav === 'modal') {
    //   this.props.toggleModal();
    // } else
    if (this.props.nav === 'view') {
      this.props.handleViewSelect(this.props.view);
    } else if (this.props.nav === 'scope') {
      // TODO need to flesh this out
      this.props.handleScopeSelect(this.props.scope);
      console.log('hit scope clickHandler', this.props.scope);
    } else {
      console.log('nav button clickHandler error');
    }
  }

  render() {
    // if (this.props.nav === 'modal') {
    //   var styleIcon = styles.info_button_fa;
    // } else
    if (this.props.currentView.view === this.props.view || this.props.currentView.scope === this.props.scope) {
      var styleIcon = styles.nav_button_fa_selected;
    } else {
      styleIcon = styles.nav_button_fa;
    }

    return (
      <button
        onClick={this.clickHandler}
        className={styles.nav_button_press_response}>
        <FontAwesome
          className={styleIcon}
          name={this.props.fa}
          size='2x'
          />
      </button>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentView: state.currentView,
  name: ownProps.title
});

const mapDispatchToProps = (dispatch) => ({
  handleViewSelect: (navButtonNum) => dispatch(handleViewSelect(navButtonNum)),
  handleScopeSelect: (scope) => dispatch(handleScopeSelect(scope)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(NavButton);
