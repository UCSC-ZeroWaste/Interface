import React, {Component} from 'react';
import NavButton from './navbar/NavButton';
import EmailButton from './navbar/EmailButton';
import LogoButton from './navbar/LogoButton';
import styles from '../../App.scss';

export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div className={styles.nav_bar}>
        <div className={styles.nav_bar_left}>
          <LogoButton/>
          <div className={styles.nav_icons_container}>
            <NavButton title={'NavButton_Leaderboard'} nav={'view'} view={0} fa={'bars'}/>
            <NavButton title={'NavButton_DiversionChart'} nav={'view'} view={1} fa={'area-chart'}/>
            <NavButton title={'NavButton_RefuseChart'} nav={'view'} view={2} fa={'bar-chart'}/>
            <NavButton title={'NavButton_Map'} nav={'view'} view={3} fa={'map'}/>
            <NavButton title={'NavButton_Tips'} nav={'view'} view={4} fa={'lightbulb-o'}/>
          </div>
        </div>
        <div className={styles.nav_bar_right}>
          <EmailButton />
        </div>
      </div>
    );
  }
}
// <NavButton title={'Table'} nav={'view'} view={5} fa={'table'}/>
// <NavButton title={'SizeView'} nav={'view'} view={6} fa={'trash'}/>
//TODO add email button in nav_bar_right


// <NavButton title={'Rank'} nav={'view'} view={4} fa={'cubes'}/>
// <NavButton title={'Progress'} nav={'view'} view={5} fa={'tasks'}/>
// <NavButton title={'Star'} nav={'view'} view={6} fa={'star-half-o'}/>
