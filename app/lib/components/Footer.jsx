import React, {Component} from 'react';
import styles from '../../App.scss';
import NavButton from './navbar/NavButton';

export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div className={styles.footer}>

        <div className={styles.footer_left}>
          <NavButton title={'Local_ScopeButton'} nav={'scope'} scope={'local'} fa={'user'}/>
          <NavButton title={'Global_ScopeButton'} nav={'scope'} scope={'global'} fa={'globe'}/>
        </div>
        <div className={styles.footer_right}>
          <NavButton title={'InfoModal_InfoButton'} nav={'modal'} scope={'info'} fa={'info-circle'} />
        </div>

      </div>
    );
  }
}
