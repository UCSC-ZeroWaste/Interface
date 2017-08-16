import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
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
  <Router>
    <Route render={({ location }) => (
      <div style={styles.fill}>
        <Route exact path="/" render={() => (
          <Redirect to="/10/90/50"/>
        )}/>

        <ul style={styles.nav}>
          <NavLink to="/10/90/50">Red</NavLink>
          <NavLink to="/120/100/40">Green</NavLink>
          <NavLink to="/200/100/40">Blue</NavLink>
          <NavLink to="/310/100/50">Pink</NavLink>
        </ul>

        <div style={styles.content}>
          <CSSTransitionGroup
            transitionAppear
            transitionName={transitions}
            transitionEnterTimeout={4000}
            transitionLeaveTimeout={500}
            transitionAppearTimeout={3000} >
            {/* no different than other usage of
                CSSTransitionGroup, just make
                sure to pass `location` to `Route`
                so it can match the old location
                as it animates out
            */}
            <Route
              location={location}
              key={location.key}
              path="/:h/:s/:l"
              component={HSL}
            />
          </CSSTransitionGroup>
        </div>
      </div>
    )}/>
  </Router>
)

const NavLink = (props) => (
  <li style={styles.navItem}>
    <Link {...props} style={{ color: 'inherit' }}/>
  </li>
)

const HSL = ({ match: { params } }) => (
  <div style={{
    ...styles.fill,
    ...styles.hsl,
    background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
  }}>hsl({params.h}, {params.s}%, {params.l}%)</div>
)

const styles = {}

styles.fill = {
  display: 'flex',
  flexDirection: 'column',
  height: '70%',
  width: '100%'

}

styles.content = {
  display: 'flex',
  flexDirection: 'column',
  height: '80%',
  width: '100%',
  textAlign: 'center'
}

styles.nav = {
  display: 'flex',
  flexDirection: 'row',
  height: '20%',
  width: '100%',
}

styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px',
}

styles.hsl  = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}

export default AnimationExample
