import React, {Component} from 'react';
import styles from '../../../App.css';
import _ from 'underscore';
import {connect} from 'react-redux';
import {COLLEGE_SET, LEADER_BOARD_COLORS} from '../../constants/constants';
import LeaderRow from './LeaderRow';

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
  }

  parsePickupData() {
    return _.map(COLLEGE_SET, (siteName) => {
      let sitePickups = this.props.records[siteName];
      let totalLoad = _.reduce(sitePickups, (sum, pickup) => { return sum + pickup.Load; }, 0);
      let loadWithoutRefuse = _.reduce(sitePickups, (sum, pickup) => pickup.Product === "Refuse" ? sum : sum + pickup.Load , 0);
      let greenRatio = (loadWithoutRefuse/totalLoad) * 100;
      return  { site: siteName,
                totalLoad: totalLoad,
                loadWithoutRefuse: loadWithoutRefuse,
                greenRatio: greenRatio
              };
    });
  }

  renderLeaderRows() {
    // if (!this.props.records) return (<h1>Could not get data.</h1>);
    let siteParsedData = this.parsePickupData();
    let leaders = siteParsedData.sort( (siteA, siteB) => siteB.greenRatio - siteA.greenRatio );

    return leaders.map( (site, i) => {
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
        <div className={styles.leader_board_header}>Can your college reach 100% zero waste?</div>
        <div className={styles.leader_rows}>
          {this.renderLeaderRows()}
        </div>
      </div>
    );
  }
 }

const mapStateToProps = (state) => ({
  records: state.records.data,
  site: state.currentView.site
});

export default connect(mapStateToProps)(LeaderBoard);
