import React, {Component} from 'react';
import styles from '../../../App.css';

export default class LeaderRow extends Component {
  constructor(props) {
    super(props);
    this.state = ({width: '10px'});
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate() {
    if (this.state.width !== this.refs.leader_row.clientHeight + 'px') {
      this.updateState();
    } else {
      // console.log('done updating ranks width', this.state);
    }
  }

  updateState() {
    this.setState({
      width: this.refs.leader_row.clientHeight + 'px'
    });
  }

  render() {
    let details = this.props.selected ? styles.details_selected : styles.details;
    let ranking = this.props.selected ? styles.rank_selected : styles.rank;
    // console.log("this.props: ", this.props);
    return (
      <div className={styles.leaderRow} ref="leader_row">
        <div className={ranking} style={this.state}>{this.props.rank}</div>
        <div className={details}>
          <div>{this.props.site.site}</div>
          <div>{Math.round(this.props.site.greenRatio)}%</div>
        </div>
      </div>
    );

  }
}
