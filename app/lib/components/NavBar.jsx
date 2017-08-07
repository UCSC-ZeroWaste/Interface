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
        <NavButton title={'LeaderBoard'} view={0} fa={'bars'}/>
        <NavButton title={'RefuseTypesChart'} view={1} fa={'area-chart'}/>
        <NavButton title={'RatioChart'} view={2} fa={'area-chart'}/>
        <NavButton title={'Map'} view={3} fa={'map'}/>
        <NavButton title={'Rank'} view={4} fa={'cubes'}/>
        <NavButton title={'Progress'} view={5} fa={'tasks'}/>
        <NavButton title={'Star'} view={6} fa={'star-half-o'}/>
      </div>
    );
  }
}
