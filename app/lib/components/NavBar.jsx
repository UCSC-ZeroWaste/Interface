import React, {Component} from 'react';
import NavButton from './navbar/NavButton';
import SiteSelector from './navbar/SiteSelector';
import styles from '../../App.css';


export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div className={styles.nav_bar}>
        <SiteSelector/>
        <NavButton title={'LeaderBoard'} view={'LeaderBoard'}/>
        <NavButton title={'LineChart'} view={'LineChart'}/>
        <NavButton title={'SizeView'} view={'SizeView'}/>
        <NavButton title={'button4'} view={'button4'}/>
        <NavButton title={'button5'} view={'button5'}/>
      </div>
    );
  }
}
