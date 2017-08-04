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
        <NavButton title={'LeaderBoard'} view={'LeaderBoard'} fa={'bars'}/>
        <NavButton title={'LineChart'} view={'LineChart'} fa={'area-chart'}/>
        <NavButton title={'SizeView'} view={'SizeView'} fa={'trash'}/>
        <NavButton title={'Map'} view={'Map'} fa={'map'}/>
        <NavButton title={'Rank'} view={'Rank'} fa={'cubes'}/>
        <NavButton title={'Progress'} view={'Progress'} fa={'tasks'}/>
        <NavButton title={'Star'} view={'Star'} fa={'star-half-o'}/>
      </div>
    );
  }
}
