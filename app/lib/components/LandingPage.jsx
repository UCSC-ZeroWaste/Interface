import React, { Component } from 'react';
import styles from '../../App.css';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {COLLEGE_NAMES} from '../constants/constants';
import {connect} from 'react-redux';
import {handleScopeSelect} from '../actions/view_actions';

const SiteButton = ({siteName, goToCarousel}) => {
  return (
    <button
      className={styles.landing_page_site_button}
      onClick={goToCarousel}
      >
      {siteName}
    </button>
  );
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteSelectionHidden: true
    };
    this.handleCampusSelect = this.handleCampusSelect.bind(this);
    this.toggleSiteSelection = this.toggleSiteSelection.bind(this);
  }

  handleCampusSelect() {
    this.props.handleScopeSelect('global');
    this.props.history.push(`/home/carousel/site/0`);
  }

  toggleSiteSelection() {
    this.setState({siteSelectionHidden: !this.state.siteSelectionHidden});
  }

  renderSiteSelectionContainer() {
    return (
      <div className={styles.landing_page_site_selection_container}>
        {COLLEGE_NAMES.map( (siteName, i) => {
          return (
            <SiteButton
              key={i}
              siteName={siteName}
              goToCarousel={() => this.props.history.push(`/home/carousel/site/${i}`)}
              />
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.page}>
        <NavBar />
        <div className={styles.main_view}>
          <div className={styles.landing_container}>
            <div className={styles.landing_text1}>
              We're reaching zero waste . . .
            </div>
            <div className={styles.landing_text2}>
              and having fun doing it.
            </div>
            <div className={styles.landing_page_button_container}>
              <button
                className={styles.landing_page_button}
                onClick={this.toggleSiteSelection}>
                Choose your college
              </button>
              <button
                className={styles.landing_page_button}
                onClick={this.handleCampusSelect}>
                See whole campus
              </button>
            </div>
            {this.state.siteSelectionHidden
              ?
              null
              : this.renderSiteSelectionContainer()
            }
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleScopeSelect: (scope) => dispatch(handleScopeSelect(scope))
});


export default connect(null, mapDispatchToProps)(LandingPage);
