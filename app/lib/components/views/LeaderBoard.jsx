import React, {Component} from 'react';
import styles from '../../../App.css';
import _ from 'underscore';
import {connect} from 'react-redux';
import {COLLEGE_SET} from '../../constants/constants';

const LeaderRow = ({rank, site, selected}) => {
  let details = selected ? styles.details_selected : styles.details;
  let ranking = selected ? styles.rank_selected : styles.rank;
  return (
    <div className={styles.leaderRow}>
      <div className={ranking}>{rank}</div>
      <div className={details}>
        <div>{site.site}</div>
        <div>{Math.round(site.greenRatio)}%</div>
      </div>
    </div>
  );
};

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
  }

  parsePickups(allPickups) {
    console.log('parsePickups', allPickups);
    let relevantPickups = allPickups.filter(function(pickup){
      return COLLEGE_SET.includes(pickup.Site);
    });
    let siteGrouping = _.groupBy(relevantPickups, 'Site');

    return _.map(COLLEGE_SET, function(siteName){
      let sitePickups = siteGrouping[siteName];
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
    if (!this.props.records.recordset) return (<h1>Could not get data.</h1>);
    let siteParsedData = this.parsePickups(this.props.records.recordset);
    let leaders = siteParsedData.sort( (siteA, siteB) => siteB.greenRatio - siteA.greenRatio );

    return leaders.map( (site, i) => {
      let selected = (site.site === this.props.site);
      return (<LeaderRow rank={i+1} site={site} key={i} selected={selected}/> );
    });
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{width: '80%', fontSize: '40', textAlign: 'left'}}>Zero Waste LeaderBoard</div>
        {this.renderLeaderRows()}
      </div>
    );
  }
 }

const mapStateToProps = (state) => ({
  records: state.records,
  site: state.site
});

export default connect(mapStateToProps)(LeaderBoard);
