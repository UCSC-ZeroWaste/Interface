import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../../App.scss';
import {LEADER_BOARD_COLORS, COLLEGE_INFO} from '../../constants/constants';

const LegendRow = ({label, color}) => {
  return (
    <div className={styles.chart_legend_row}>
      <div style={{backgroundColor: color}} className={styles.chart_legend_color}></div>
      <div className={styles.chart_legend_site_label}>
        {label}
      </div>
    </div>
  );
};

class ChartLegend extends Component {
  constructor(props) {
    super(props);
    // console.log('props for chart legend', props);
  }

  renderRows() {
    if (this.props.scope === 'local') {
      const index = this.props.leaders.findIndex( leader => leader.site === this.props.site );
      const color = [LEADER_BOARD_COLORS[index]];
      return <LegendRow color={color} label={COLLEGE_INFO[this.props.site].shortName}/>;
    } else {
      return this.props.leaders.map( (leader, idx) => <LegendRow key={idx} label={COLLEGE_INFO[leader.site].shortName} color={LEADER_BOARD_COLORS[idx]}/>);
    }
  }

  render() {
    return (
      <div className={styles.chart_legend}>
        {this.renderRows()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  leaders: state.records.leaders,
  scope: state.currentView.scope,
  site: state.currentView.site
});

export default connect(mapStateToProps)(ChartLegend);
