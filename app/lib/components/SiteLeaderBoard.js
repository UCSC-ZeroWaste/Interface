import React from 'react';
import _ from 'underscore';

class LeaderRow extends React.Component {
  render() {
    return (
        <tr>
          <td>{this.props.rank}</td>
          <td>{this.props.site.site}</td>
          <td>{Math.round(this.props.site.divertLoad)}%</td>
        </tr>
        );
  }
}


module.exports = React.createClass({
  parseSiteData: function(data){
    return _.map(data, function(entry, i) {
      return { 'load' : entry.Load,
        'picked_up' : entry.PickupTime,
        'index' : i };
    });
  },
  render: function () {
    var sites = this.props.records.recordset;
    if (!sites) return(<h1>Could not get data.</h1>);
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
    console.log("Site ", siteCol)

    siteGroup = _.keys(siteGroup);
    var collegeGroup = _.map(siteGroup, function(siteName){
      var currentSite = _.filter(siteCol, function(site){ if (site.Site == siteName) return site });
      var totalLoad = _.reduce(currentSite, function(prev, site){ return prev + site.Load }, 0);
      var LoadWithoutRefuse = _.reduce(currentSite, function(prev, site){ if(site.Product == "Refuse") return prev; return prev + site.Load }, 0);
      var divertLoad = (LoadWithoutRefuse/totalLoad) * 100;
        console.log(siteName);
        console.log("Total Load ", totalLoad);
        console.log("Total Load without Refuse ", LoadWithoutRefuse);
        console.log("Diverted ", divertLoad,"%" );
      return  { "site": siteName, "totalLoad": totalLoad,"LoadWithoutRefuse": LoadWithoutRefuse,"divertLoad": divertLoad }
    });

    var leaders = collegeGroup.sort(function(siteA, siteB){ return siteB.divertLoad - siteA.divertLoad });
    console.log("Lead", leaders)
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
 });
