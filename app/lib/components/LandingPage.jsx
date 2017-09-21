import React, { Component } from 'react';
import styles from '../../App.css';
// import NavBar from './NavBar.jsx';
// import Footer from './Footer.jsx';
import LogoButton from './navbar/LogoButton';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {COLLEGE_NAMES} from '../constants/constants';
import {connect} from 'react-redux';
import {handleScopeSelect} from '../actions/view_actions';

// const SiteButton = ({siteName, goToCarousel}) => {
//   return (
//     <button
//       className={styles.landing_page_site_button}
//       onClick={goToCarousel}
//       >
//       {siteName}
//     </button>
//   );
// };

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteSelectionHidden: true
    };
    this.handleCampusSelect = this.handleCampusSelect.bind(this);
    // this.toggleSiteSelection = this.toggleSiteSelection.bind(this);
  }

  handleCampusSelect() {
    this.props.handleScopeSelect('global');
    this.props.history.push(`/home/carousel/site/0`);
  }

  // toggleSiteSelection() {
  //   this.setState({siteSelectionHidden: !this.state.siteSelectionHidden});
  // }

  // renderSiteSelectionContainer() {
  //   return (
  //     <div className={styles.landing_page_site_selection_container}>
  //       {COLLEGE_NAMES.map( (siteName, i) => {
  //         return (
  //           <SiteButton
  //             key={i}
  //             siteName={siteName}
  //             goToCarousel={() => this.props.history.push(`/home/carousel/site/${i}`)}
  //             />
  //         );
  //       })}
  //     </div>
  //   );
  // }

  renderSiteSelectors(){
    return (
      COLLEGE_NAMES.map( (siteName, i) => {
        return (
          <button
            key={i}
            siteName={siteName}
            onClick={() => this.props.history.push(`/home/carousel/site/${i}`)}
            >
            {siteName}
          </button>
        );
      })

    );
  }

  render() {
    return (
      <div className={styles.landing_page}>
        <div className={styles.nav_bar_container}>
          <div className={styles.nav_bar}>
            <div className={styles.nav_bar_left}>
              <LogoButton/>
            </div>
            <div className={styles.nav_bar_right}>
            </div>
          </div>
        </div>
        <div className={styles.main_view}>
          <div className={styles.landing_container}>
            <div className={styles.landing_text1}>
              We're reaching zero waste . . .
            </div>
            <div className={styles.landing_text2}>
              and having fun doing it.
            </div>
            <div className={styles.landing_page_button_container}>
              <div className={styles.landing_page_site_selection_container}>
                <button
                  className={styles.landing_page_button}>
                  Choose your college
                </button>
                <div className={styles.dropdown_content}>
                  {this.renderSiteSelectors()}
                </div>
              </div>
              <button
                className={styles.landing_page_button}
                onClick={this.handleCampusSelect}>
                See whole campus
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// {this.state.siteSelectionHidden
//   ?
//   null
//   : this.renderSiteSelectionContainer()
// }

const mapDispatchToProps = (dispatch) => ({
  handleScopeSelect: (scope) => dispatch(handleScopeSelect(scope))
});


export default connect(null, mapDispatchToProps)(LandingPage);
