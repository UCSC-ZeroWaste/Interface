import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../../App.css';


const LegendRow = ({label}) => {
  return (
    <div className={styles.chart_legend_row}>
      {label}
    </div>
  );
};

class ChartLegend extends Component {
  constructor(props) {
    super(props);
  }

  // renderLegendRow() {
  //   return (
  //     <div key={idx}>
  //       Hi!!!!
  //     </div>
  //   )
  // }

  renderRows() {
    if (this.props.scope === 'local') {
      return <LegendRow label={'TEMP'}/>;
    } else {
      return this.props.leaders.map( (leader, idx) => <LegendRow key={idx} label={leader.site}/>);
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
  scope: state.currentView.scope
});

export default connect(mapStateToProps)(ChartLegend);
