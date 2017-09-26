import React, {Component} from 'react';
import styles from '../../../App.scss';

export default class ViewTemplate extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className={styles.template}>
        {this.props.title}
      </div>
    );
  }
}
