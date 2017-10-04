import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../../App.scss';

export default class EmailModal extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div>
        <div className={styles.info_container}>
          <div className={styles.info_test}>
            What is this "Zero" screen all about?<br /><br />
            This interactive screen shows the amount of waste that is picked up on the University of Santa Cruz campus. The amount of waste is calculated using mechanical scales that are fitted to the arm of each garbage truck that weigh each load.  We believe that by presenting the campus’s waste data in a way that is public, color graded, and ranks colleges by their waste score, we will help encourage students to adopt better zero waste behaviors and achieve the university's goal of becoming a complete zero waste campus. <br /><br />

            Click the TAKE ACTION button in the top right of the screen to join our zero waste mission and learn awesome tips on how you can live without creating any garbage at all.
          </div>
        </div>
      </div>
    );
  }
}
