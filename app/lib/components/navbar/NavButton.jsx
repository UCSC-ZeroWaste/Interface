import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleViewSelect, handleSiteSelect, handleScopeSelect} from '../../actions/view_actions';
import styles from '../../../App.css';
import FontAwesome from 'react-fontawesome';

class NavButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
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
    if (this.props.currentView.view === this.props.view || this.props.currentView.scope === this.props.scope) {
      var styleButton = styles.nav_button_selected;
      var styleIcon = styles.nav_button_fa_selected;
    } else {
      styleButton = styles.nav_button;
      styleIcon = styles.nav_button_fa;
    }

    return (
      <div className={styleButton}>
        <FontAwesome
          onClick={this.clickHandler}
          className={styleIcon}
          name={this.props.fa}
          size='2x'
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
  handleViewSelect: (navButtonNum) => dispatch(handleViewSelect(navButtonNum)),
  handleSiteSelect: (site) => dispatch(handleSiteSelect(site)),
  handleScopeSelect: (scope) => dispatch(handleScopeSelect(scope))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(NavButton);
