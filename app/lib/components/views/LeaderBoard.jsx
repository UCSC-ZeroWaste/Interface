import React, {Component} from 'react';
import styles from '../../../App.scss';
import _ from 'underscore';
import {connect} from 'react-redux';
import {COLLEGE_NAMES, LEADER_BOARD_COLORS} from '../../constants/constants';
import LeaderRow from './LeaderRow';

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
  }

  // getHeight() {
  //   if (this.refs.leader_row) {
  //     return this.refs.leader_row.clientHeight;
  //   } else {return '10px';}
  // }

  renderLeaderRows() {
    return this.props.leaders.map( (site, i) => {
      let selected = (site.site === this.props.site);
      return (
        <LeaderRow
          rank={i+1}
          site={site}
          key={i}
          selected={selected}
          color={LEADER_BOARD_COLORS[i]}
        />
      );
    });
  }

  render() {
    return (
      <div className={styles.leader_board_container}>
        <div className={styles.leader_board_header}>Zero waste leaderboard</div>
        <div className={styles.leader_rows}>
          {this.renderLeaderRows()}
        </div>
      </div>
    );
  }
 }

const mapStateToProps = (state) => ({
  leaders: state.records.leaders,
  site: state.currentView.site,
  daysInRange: state.records.daysInRange,
});

export default connect(mapStateToProps)(LeaderBoard);
