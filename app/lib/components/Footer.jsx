import React, {Component} from 'react';
import styles from '../../App.css';
import SiteSelector from './navbar/SiteSelector';

export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div className={styles.footer_container}>
          <div className={styles.footer}>
            <SiteSelector/>
          </div>
      </div>
    );
  }
}
