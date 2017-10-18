import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ViewTemplate from '../views/_ViewTemplate';
import LeaderBoard from '../views/LeaderBoard.jsx';
import LineChart from '../views/LineChart.jsx';
import SizeView from '../views/SizeView.jsx';
import Slider from 'react-slick';
import {handleViewSelect} from '../../actions/view_actions';
import styles from '../../../App.scss';
import { CSSTransitionGroup } from 'react-transition-group';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import sliding from './sliding.css';
import transitions from './transitions.css';


/* you'll need this CSS somewhere
.fade-enter {
  opacity: 0;
  z-index: 1;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 250ms ease-in;
}
*/

const AnimationExample = () => (
  <Router >
    <Route render={({ location }) => (
      <div style={{height: '100%'}}>
        <Route exact path="/" render={() => (
          <Redirect to="/1"/>
        )}/>

        <ul className={styles.router_nav}>
          <NavLink to="/1">1</NavLink>
          <NavLink to="/2">2</NavLink>
          <NavLink to="/3">3</NavLink>
          <NavLink to="/4">4</NavLink>
          <NavLink to="/5">5</NavLink>
          <NavLink to="/6">6</NavLink>
          <NavLink to="/7">7</NavLink>
          <NavLink to="/8">8</NavLink>
          <NavLink to="/9">9</NavLink>
        </ul>

      <div className={transitionStyles.router_content}>
          <CSSTransitionGroup
            transitionAppear
            transitionName={transitions}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionAppearTimeout={3000}
            >
            {/* no different than other usage of
                CSSTransitionGroup, just make
                sure to pass `location` to `Route`
                so it can match the old location
                as it animates out
            */}
            <Route
              location={location}
              key={location.pathname}
              path="/:num"
              component={({ match: { params } }) => components[parseInt(params.num) - 1]}
            />
          </CSSTransitionGroup>
        </div>
      </div>
    )}/>
  </Router>
);


const NavLink = (props) => (
  <li className={styles.router_navItem}>
    <Link {...props} style={{ color: 'inherit' }}/>
  </li>
);

const HSL = ({ match: { params } }) => (
  components[parseInt(params.num) - 1]
);

const transitionStyles = {};

// transitionStyles.fill = {
//   display: 'flex',
//   flexDirection: 'column',
//   height: '100%',
//   width: '100%'
//
// }

transitionStyles.router_content = {
  display: 'flex',
  flexDirection: 'column',
  height: '80%',
  width: '100%',
  textAlign: 'center'
};

// transitionStyles.nav = {
//   display: 'flex',
//   flexDirection: 'row',
//   height: '20%',
//   width: '100%',
// }

// transitionStyles.navItem = {
//   textAlign: 'center',
//   flex: 1,
//   listStyleType: 'none',
//   padding: '10px',
// }

// transitionStyles.hsl  = {
//   ...transitionStyles.fill,
//   color: 'white',
//   paddingTop: '20px',
//   fontSize: '30px'
// }

const components = [
 (<div className={styles.router_div}> Hi </div>),
 (<div className={styles.router_div}> You </div>),
 <LeaderBoard/>,
 <LineChart type={'diversion'}/>,
   <LineChart type={'refuse'}/>,
   <SizeView />,
   <_ViewTemplate title={'Empty View 5'}/>,
   <_ViewTemplate title={'Empty View 6'}/>,
   <_ViewTemplate title={'Empty View 7'}/>
];

export default AnimationExample;
