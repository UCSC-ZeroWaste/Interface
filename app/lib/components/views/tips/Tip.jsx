import React, {Component} from 'react';
import tips from './tipContent.js';
// import tip1_image from '../../../assets/images/tips/corgy_image.jpg';
import styles from '../../../../App.css';

export default class ViewTemplate extends Component {
  constructor(props) {
    super(props);
    this.numTips = tips.length;
    this.state = {
      tipIndex: 0
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(direction) {
    if (direction === 'next') {
      var tipIndex = this.state.tipIndex + 1;
    } else {
      tipIndex = this.state.tipIndex - 1;
    }
    if (tipIndex < 0) tipIndex = this.numTips - 1;
    if (tipIndex > this.numTips - 1 ) tipIndex = 0;
    this.setState({tipIndex});
  }

  render(){
    return (
      <div className={styles.tip_container}>
        <div className={styles.tip_header}>
          {"Actions you can take to get to zero waste"}
          <br/>
          {tips[this.state.tipIndex].title}
        </div>
        <div className={styles.tip_content}>
          <img src={tips[this.state.tipIndex].image} className={styles.tip_img}/>
          <div className={styles.tip_column}>

            <div className={styles.tip_text}>
              {tips[this.state.tipIndex].text}
            </div>

            <div className={styles.tip_button_container}>
              <div onClick={() => this.clickHandler('prev')} className={styles.tip_button_previous}>{"PREVIOUS"}</div>
              <div onClick={() => this.clickHandler('next')} className={styles.tip_button_next}>{"NEXT"}</div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
// <div style={{backgroundImage: `url(${tips[this.state.tipIndex].image})`}} className={styles.tip1_img}/>
