import React, {Component} from 'react';
import tips from './tipContent.js';
import {connect} from 'react-redux';
import styles from '../../../../App.scss';

class Tip extends Component {
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
    let touchscreen = this.props.device === 'touchscreen' ? styles.touchscreen : "";

    return (
      <div className={styles.tip_container}>
        <div className={styles.tip_header}>
          {"Actions you can take to get to zero waste"}
        </div>
        <div className={styles.tip_subheader}>
          {
            tips[this.state.tipIndex].title
            // + "  "
            // + `[${this.state.tipIndex + 1} of ${this.numTips}]`
          }
        </div>
        <div className={styles.tip_content}>
          <div className={styles.tip_img_container}>
            <img draggable='false' src={tips[this.state.tipIndex].image} className={styles.tip_img}/>
          </div>
          <div className={styles.tip_textbox_and_buttons}>

            <div className={`${styles.tip_textbox} ${touchscreen}`}>
              {tips[this.state.tipIndex].text}
            </div>

            <div className={styles.tip_buttons_container}>
              <button onClick={() => this.clickHandler('prev')} className={styles.tip_button}>{"PREVIOUS"}</button>
              <button onClick={() => this.clickHandler('next')} className={styles.tip_button}>{"NEXT"}</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
// <div style={{backgroundImage: `url(${tips[this.state.tipIndex].image})`}} className={styles.tip1_img}/>
const mapStateToProps = (state) => ({
  device: state.currentView.device,
});
export default connect(mapStateToProps)(Tip);
