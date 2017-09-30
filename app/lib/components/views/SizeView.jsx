import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import person from 'Images/person.png';
import trash from 'Images/trash.png';

class SizeView extends Component {
  constructor(props) {
    super(props);
    this.calculateSize();
  }

  calculateSize () {

  }

  renderGarbage() {
    let multiple = 40;
    let bags = new Array(multiple).fill(0);
    return bags.map( () => <img src={trash} style={{height: '80px', width: '80px'}}></img>);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div> This is how much garbage is created by your college each week. </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div>
            <img src={person} style={{height: '80px', width: '80px'}}></img>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {this.renderGarbage()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(SizeView);
