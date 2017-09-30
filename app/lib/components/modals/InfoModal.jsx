import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class EmailModal extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div>
        <div>
          The information shown on this interactive screen presents the amount of waste that is picked up on the University of Santa Cruz’s campus. The amount of waste is calculated using mechanical scales that are fitted to the arm of each garbage truck and weigh each load.  We believe that by presenting the campus’s waste data in a way that is public, color graded, and ranks colleges by their waste score, will help encourage students to adopt better zero waste behaviors and achieve the universities goal of becoming a complete zero waste campus.

          Click the TAKE ACTION button in the top right of the screen to sign up for more tips on how you can live without creating any garbage at all.
        </div>
      </div>
    );
  }
}
