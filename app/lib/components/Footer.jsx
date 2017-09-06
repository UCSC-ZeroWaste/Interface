import React, {Component} from 'react';
import styles from '../../App.css';
import SiteSelector from './navbar/SiteSelector';
import NavButton from './navbar/NavButton';

export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div className={styles.footer_container}>
          <div className={styles.footer}>

            <div className={styles.footer_left}>
              <NavButton title={'Local'} nav={'scope'} scope={'local'} fa={'user'}/>
              <NavButton title={'Global'} nav={'scope'} scope={'global'} fa={'globe'}/>
            </div>
            <SiteSelector/>
            <div className={styles.footer_right}>

            </div>

          </div>
      </div>
    );
  }
}
