import React, {Component} from 'react';
import NavButton from './navbar/NavButton';
import styles from '../../App.css';


export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div className={styles.nav_bar_container}>
        <div className={styles.nav_bar}>
          <div className={styles.logo}>ZERO</div>
          <NavButton title={'LeaderBoard'} view={0} fa={'bars'}/>
          <NavButton title={'RefuseTypesChart'} view={1} fa={'area-chart'}/>
          <NavButton title={'RatioChart'} view={2} fa={'area-chart'}/>
          <NavButton title={'Map'} view={3} fa={'map'}/>
          <NavButton title={'Rank'} view={4} fa={'cubes'}/>
          <NavButton title={'Progress'} view={5} fa={'tasks'}/>
          <NavButton title={'Star'} view={6} fa={'star-half-o'}/>
        </div>
      </div>
    );
  }
}
