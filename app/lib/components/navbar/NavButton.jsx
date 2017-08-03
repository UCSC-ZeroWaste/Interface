import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleNavSelect} from '../../actions/views';
import styles from '../../../App.css';


class NavButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let styleButton = this.props.currentView === this.props.name ? styles.nav_button_selected : styles.nav_button;

    return (
      <button
        className={styleButton}
        onClick={() => this.props.handleNavSelect(this.props.view)}>
        {this.props.name}
      </button>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  currentView: state.currentView,
  name: ownProps.title
});

const mapDispatchToProps = (dispatch) => ({
  handleNavSelect: (navButtonNum) => dispatch(handleNavSelect(navButtonNum))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(NavButton);
