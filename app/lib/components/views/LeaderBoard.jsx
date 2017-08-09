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

  // componentDidMount() {
  //   let cw = $('.rank').height();
  //   $('.rank').css({'width':cw+'px'});
  // }

  parsePickupData(allPickups) {
    // let test = _.groupBy(allPickups, 'Site');
    // console.log(test);
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
    if (!this.props.records) return (<h1>Could not get data.</h1>);
    let siteParsedData = this.parsePickupData(this.props.records);
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
  records: state.records,
  site: state.site
});

export default connect(mapStateToProps)(LeaderBoard);
