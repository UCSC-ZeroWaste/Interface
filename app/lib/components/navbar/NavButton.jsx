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
    let styleButton = this.props.currentView === this.props.name ? styles.nav_button_selected : styles.nav_button;

    return (
      <button
        className={styleButton}
        onClick={() => this.props.handleNavSelect(this.props.view)}>
          <FontAwesome
            name={this.props.fa}
            size='3x'
            style={{ width: '50', height: '50' }}
            />
      </button>
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
