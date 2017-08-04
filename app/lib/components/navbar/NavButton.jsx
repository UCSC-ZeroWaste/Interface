import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleNavSelect} from '../../actions/views';
import styles from '../../../App.css';
import FontAwesome from 'react-fontawesome';

class NavButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currentView === this.props.name) {
      var styleButton = styles.nav_button_selected;
      var styleIcon = styles.nav_button_fa_selected;
    } else {
      styleButton = styles.nav_button;
      styleIcon = styles.nav_button_fa;
    }

    return (
      <div
        className={styleButton}>
          <FontAwesome
            onClick={() => this.props.handleNavSelect(this.props.view)}
            className={styleIcon}
            name={this.props.fa}
            size='3x'
            />
        </div>
    );
  }
}
// {this.props.name}
// <div style={{width: '50', height: '50', backgroundColor: 'blue'}}>
// </div>
// style={{ width: '50', height: '50', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}

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
