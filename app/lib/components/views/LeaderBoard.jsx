import React, {Component} from 'react';
import styles from '../../../App.css';
import _ from 'underscore';
import {connect} from 'react-redux';
import {collegeSet} from '../../constants/constants';

const LeaderRow = ({rank, site, selected}) => {
  let details = selected ? styles.details_selected : styles.details;
  let ranking = selected ? styles.rank_selected : styles.rank;
  return (
    <div className={styles.leaderRow}>
      <div className={ranking}>{rank}</div>
      <div className={details}>
        <div>{site.site}</div>
        <div> {selected} </div>
        <div>{Math.round(site.divertLoad)}%</div>
      </div>
    </div>
  );
};

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
  }

  // TODO is this function even used?
  parseSiteData(data) {
    return _.map(data, function(entry, i) {
      return { 'load' : entry.Load,
        'picked_up' : entry.PickupTime,
        'index' : i };
    });
  }

  getLeaderRows() {
    let sites = this.props.records.recordset;
    if (!sites) return (<h1>Could not get data.</h1>);

    sites = _.filter(sites, function(site){
      return collegeSet.includes(site.Site);
    });
    let siteGroup = _.groupBy(sites, 'Site');
    let siteCol = [];
    _.each(siteGroup, function(site){
      siteCol = siteCol.concat(site);
    });
    console.log("Site ", siteCol);

    siteGroup = _.keys(siteGroup);
    let collegeGroup = _.map(siteGroup, function(siteName){
      let currentSite = _.filter(siteCol, (site) => { if (site.Site === siteName) return site; });
      let totalLoad = _.reduce(currentSite, (prev, site) => { return prev + site.Load; }, 0);
      let LoadWithoutRefuse = _.reduce(currentSite, function(prev, site){ if(site.Product === "Refuse") return prev; return prev + site.Load; }, 0);
      let divertLoad = (LoadWithoutRefuse/totalLoad) * 100;
        console.log(siteName);
        console.log("Total Load ", totalLoad);
        console.log("Total Load without Refuse ", LoadWithoutRefuse);
        console.log("Diverted ", divertLoad,"%" );
      return  { "site": siteName, "totalLoad": totalLoad,"LoadWithoutRefuse": LoadWithoutRefuse,"divertLoad": divertLoad };
    });
    let leaders = collegeGroup.sort( (siteA, siteB) => siteB.divertLoad - siteA.divertLoad );
    console.log("Lead", leaders);

    return leaders.map( (site, i) => {
      let selected = (site.site === this.props.site);
      return (<LeaderRow rank={i+1} site={site} key={i} selected={selected}/> );
    });
  }

  render() {
    let leaderColl = this.getLeaderRows();

    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{width: '80%', fontSize: '40', textAlign: 'left'}}>Zero Waste LeaderBoard</div>
        {leaderColl}
      </div>
    );
  }
 }

const mapStateToProps = (state) => ({
  records: state.records,
  site: state.site
});

export default connect(mapStateToProps)(LeaderBoard);
