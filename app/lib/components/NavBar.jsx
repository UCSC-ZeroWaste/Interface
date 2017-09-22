import React, {Component} from 'react';
import NavButton from './navbar/NavButton';
import EmailButton from './navbar/EmailButton';
import LogoButton from './navbar/LogoButton';
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
            <LogoButton/>
            <div className={styles.nav_icons_container}>
              <NavButton title={'LeaderBoard'} nav={'view'} view={0} fa={'bars'}/>
              <NavButton title={'RefuseTypesChart'} nav={'view'} view={1} fa={'area-chart'}/>
              <NavButton title={'RatioChart'} nav={'view'} view={2} fa={'pie-chart'}/>
              <NavButton title={'Map'} nav={'view'} view={3} fa={'map'}/>
              <NavButton title={'Tips'} nav={'view'} view={4} fa={'lightbulb-o'}/>
              <NavButton title={'Table'} nav={'view'} view={5} fa={'table'}/>
            </div>
          </div>
          <div className={styles.nav_bar_right}>
          </div>
        </div>
      </div>
    );
  }
}
//TODO add email button in nav_bar_right
// <EmailButton />


// <NavButton title={'Rank'} nav={'view'} view={4} fa={'cubes'}/>
// <NavButton title={'Progress'} nav={'view'} view={5} fa={'tasks'}/>
// <NavButton title={'Star'} nav={'view'} view={6} fa={'star-half-o'}/>
