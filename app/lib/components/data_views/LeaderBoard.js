import React, {Component} from 'react';
import _ from 'underscore';
import {connect} from 'react-redux';

const LeaderRow = ({rank, site}) => {
  return (
    <tr>
      <td>{rank}</td>
      <td>{site.site}</td>
      <td>{Math.round(site.divertLoad)}%</td>
    </tr>
  );
};

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
  }

  //  is this function even used?
  parseSiteData(data) {
    return _.map(data, function(entry, i) {
      return { 'load' : entry.Load,
        'picked_up' : entry.PickupTime,
        'index' : i };
    });
  }

  render() {
    var sites = this.props.records.recordset;
    if (!sites) return (<h1>Could not get data.</h1>);
    var collegeSet = [
      "College Nine and Ten",
      "Cowell-Stevenson",
      "Crown-Merrill",
      "Kresge",
      "Oakes",
      "Porter",
      "College Eight"
    ];
    sites = _.filter(sites, function(site){
      return collegeSet.includes(site.Site);
    });
    var siteGroup = _.groupBy(sites, 'Site');
    var siteCol = [];
    _.each(siteGroup, function(site){
      siteCol = siteCol.concat(site);
    });
    console.log("Site ", siteCol);

    siteGroup = _.keys(siteGroup);
    var collegeGroup = _.map(siteGroup, function(siteName){
      var currentSite = _.filter(siteCol, (site) => { if (site.Site === siteName) return site; });
      var totalLoad = _.reduce(currentSite, (prev, site) => { return prev + site.Load; }, 0);
      var LoadWithoutRefuse = _.reduce(currentSite, function(prev, site){ if(site.Product === "Refuse") return prev; return prev + site.Load; }, 0);
      var divertLoad = (LoadWithoutRefuse/totalLoad) * 100;
        console.log(siteName);
        console.log("Total Load ", totalLoad);
        console.log("Total Load without Refuse ", LoadWithoutRefuse);
        console.log("Diverted ", divertLoad,"%" );
      return  { "site": siteName, "totalLoad": totalLoad,"LoadWithoutRefuse": LoadWithoutRefuse,"divertLoad": divertLoad };
    });

    var leaders = collegeGroup.sort( (siteA, siteB) => siteB.divertLoad - siteA.divertLoad );
    console.log("Lead", leaders);
    var leaderColl = [];
    _.each(leaders, function(site, i){
      leaderColl.push(<LeaderRow rank={i+1} site={site} key={i}/>);
    });

    return (
      <div>
        <table>
          <tr>
            <th>Rank</th>
            <th>College</th>
            <th>Diversion</th>
          </tr>
          {leaderColl}
        </table>
      </div>
    );
  }
 }

const mapStateToProps = (state) => ({
  records: state.records,
  site: state.site
});

export default connect(mapStateToProps)(LeaderBoard);
