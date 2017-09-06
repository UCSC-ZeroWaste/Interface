import React, {Component} from 'react';
import NavButton from './navbar/NavButton';
import EmailButton from './navbar/EmailButton';
import styles from '../../App.css';

export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div className={styles.nav_bar_container}>
        <div className={styles.nav_bar}>
          <div className={styles.nav_bar_left}>
            <div className={styles.logo}>ZERO</div>
            <div className={styles.nav_icons_container}>
              <NavButton title={'LeaderBoard'} nav={'view'} view={0} fa={'bars'}/>
              <NavButton title={'RefuseTypesChart'} nav={'view'} view={1} fa={'area-chart'}/>
              <NavButton title={'RatioChart'} nav={'view'} view={2} fa={'pie-chart'}/>
              <NavButton title={'Map'} nav={'view'} view={3} fa={'map'}/>
              <NavButton title={'Rank'} nav={'view'} view={4} fa={'cubes'}/>
              <NavButton title={'Progress'} nav={'view'} view={5} fa={'tasks'}/>
              <NavButton title={'Star'} nav={'view'} view={6} fa={'star-half-o'}/>
            </div>
          </div>
          <div className={styles.nav_bar_right}>
            <EmailButton />
          </div>
        </div>
      </div>
    );
  }
}
// <div className={styles.info_button}></div>
