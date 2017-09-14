import React, { Component } from 'react';
import styles from '../../App.css';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {COLLEGE_SET} from '../constants/constants';

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

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteSelectionHidden: true
    };
    this.handleCampusSelect = this.handleCampusSelect.bind(this);
    this.toggleSiteSelection = this.toggleSiteSelection.bind(this);
  }

  handleCampusSelect() {
  }

  toggleSiteSelection() {
    this.setState({siteSelectionHidden: !this.state.siteSelectionHidden});
  }

  renderSiteSelectionContainer() {
    return (
      <div className={styles.landing_page_site_selection_container}>
        {COLLEGE_SET.map( (siteName, i) => {
          return (
            <SiteButton
              key={i}
              siteName={siteName}
              goToCarousel={() => this.props.history.push(`/carousel/site/${i}`)}
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
              We're reaching zero waste...
            </div>
            <div className={styles.landing_text2}>
              and having fun doing it.
            </div>
            <div className={styles.landing_page_button_container}>
              <button
                className={styles.landing_page_button}
                onClick={this.toggleSiteSelection}>
                Choose Your House
              </button>
              <button
                className={styles.landing_page_button}
                onClick={this.handleCampusSelect}>
                See Whole Campus
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
