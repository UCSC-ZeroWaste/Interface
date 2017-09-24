import React, {Component} from 'react';
import tip1_image from '../../../assets/images/tips/corgy_image.jpg';
import styles from '../../../../App.css';

export default class ViewTemplate extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className={styles.tip_container}>
        <div className={styles.tip_header}>
          {"Actions you can take to get to zero waste"}
          <br/>
          {"Buy food in bulk"}
        </div>
        <div className={styles.tip_content}>
          <img src={tip1_image} className={styles.tip1_img}></img>
          <div className={styles.tip_text}>
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
          </div>
        </div>
      </div>
    );
  }
}
