import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../../App.css';
import {LEADER_BOARD_COLORS} from '../../constants/constants';

const LegendRow = ({label, color}) => {
  return (
    <div className={styles.chart_legend_row}>
      <div style={{height: '20px', width: '20px', backgroundColor: color, border: '1px solid black'}}></div>
      {label}
    </div>
  );
};

class ChartLegend extends Component {
  constructor(props) {
    super(props);
  }

  renderRows() {
    if (this.props.scope === 'local') {
      const index = this.props.leaders.findIndex( leader => leader.site === this.props.site );
      const color = [LEADER_BOARD_COLORS[index]];
      return <LegendRow color={color} label={this.props.site}/>;
    } else {
      return this.props.leaders.map( (leader, idx) => <LegendRow key={idx} label={leader.site} color={LEADER_BOARD_COLORS[idx]}/>);
    }
  }

  render() {
    return (
      <div className={styles.chart_legend_container}>
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
