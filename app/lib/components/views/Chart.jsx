import React, {Component} from 'react';
import _ from 'underscore';
import moment from 'moment';
import {LineChart} from 'rd3';
// import {ScatterChart} from 'rd3';
import ChartLegend from './ChartLegend';
import d3 from 'd3';
import {connect} from 'react-redux';
import {WASTE_TYPES, LEADER_BOARD_COLORS} from '../../constants/constants';
import {CHART, ROLLING_AVERAGE_SPAN} from '../../constants/settings';
import styles from '../../../App.scss';
import ContainerDimensions from 'react-container-dimensions';
import merge from 'lodash/merge';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = this.chartState();
  }

  chartState() {
    if (this.props.type === 'line') {
      var state = {
        title: "Percentage of waste diverted from landfill",
        xLabel: "Time Period",
        yLabel: "Diversion percentage (%)",
      };
    } else {
      state = {
        title: "Pounds of waste to landfill",
        xLabel: "Date",
        yLabel: "Weight (lbs)",
      };
    }
    return state;
  }

  getChartDomain() {
    switch (this.props.type) {
      case 'line':
        let begRange = moment.utc(this.props.dateRange[0]).add(ROLLING_AVERAGE_SPAN, 'days');
        let endRange = new Date(this.props.dateRange[1]);
        return {x: [begRange, endRange], y: [0,100]};
      case 'scatter':
        begRange = new Date(this.props.dateRange[0]);
        endRange = moment.utc(this.props.dateRange[1]).add(1, 'days');
        return {x: [begRange, endRange], y: [0,undefined]};
      default:
        return {x: [undefined,undefined], y: [undefined,undefined]};
      }
  }

  getTickInterval() {
    let temp = this.props.type === 'line' ? ROLLING_AVERAGE_SPAN : 0;
    let days = this.props.daysInRange - temp;
    if ( days <= 14) {
      return {unit: 'day', interval: 1};
    } else if (days <= 30) {
      return {unit: 'day', interval: 7}; //setting will only show months
    } else if (days <= 50) {
      return {unit: 'day', interval: 1000}; //setting will only show months
    } else if (days > 50) {
      return {}; //setting will auto set ticks -- should be good?
    }
  }

  renderChart(height, width) {
    const index = this.props.leaders.findIndex( leader => leader.site === this.props.site );

    let generalSettings = {
      width: width,
      height: height,
      viewBoxObject: {
        x: 0,
        y: height * -.04,
        width: Number(width) * 1,
        height: Number(height) * 1
      },
      domain: this.getChartDomain(),
      xAxisTickInterval: this.getTickInterval(),
      colors: (colorAccessorFunc) => LEADER_BOARD_COLORS[colorAccessorFunc],
      circleRadius: this.props.type === 'line' ? 0 : 5,
    };

      // TODO need to take another look at the color accessor
      // colorAccessor: (d, idx) => {
      //   let siteName = (this.props.scope === 'local' ? this.props.site : d.name);
      //   let leaderBoardIndexValue = this.props.leaders.findIndex( leader => leader.site === siteName );
      //
      //   // if (!d.name && idx === 8 && this.props.type === 'line' && this.props.scope === 'global') {
      //   //   console.log(`colorAccessor for ${this.props.type} d: ${d} and idx: ${idx}`);
      //   //   console.log(d.name);
      //   //   console.log(leaderBoardIndexValue);
      //   // }
      //   if (this.props.scope === 'local') {
      //     return this.props.leaders.findIndex( leader => leader.site === this.props.site );
      //   } else {
      //     // if (d.name === undefined) {
      //     //   console.log('idx: idx', d.point.seriesIndex, idx, d.point.id);
      //     // } else {
      //     //   console.log('idx: ', idx, d.name);
      //     // }
      //
      //     //TODO Somehow the plot points for the first data line (when switching from local to global)
      //     //do not follow the rules that the other plot points do -- it will default to the local
      //     //color trend line.
      //     // if (d.name === undefined) {
      //     //   return 0;
      //     // } else if (idx === 11) {
      //     //   return 10;
      //     // } else {
      //       return idx;
      //     // }
      //   }
      //   // if (leaderBoardIndexValue >= 0) {
      //   //   // console.log(siteName, leaderBoardIndexValue, this.props.type);
      //   //   return leaderBoardIndexValue;
      //   // } else {
      //   //   return idx;
      //   // }
      // },

    if (this.props.type === 'line') {
      if (this.props.scope === 'local') {
        return (
          <LineChart
            colorAccessor={(d, idx) => this.props.leaders.findIndex( leader => leader.site === this.props.site)}
            {...generalSettings}
            data={this.props.diversionPlotPoints.filter( (site) => site.name === this.props.site)}
            {...CHART.axes}
            {...CHART.general}
            {...CHART.line}
            />
        );
      } else if (this.props.scope === 'global') {
        return (
          <LineChart
            colorAccessor={(d, idx) => idx}
            {...generalSettings}
            data={this.props.diversionPlotPoints}
            {...CHART.axes}
            {...CHART.general}
            {...CHART.line}
            />
        );
      }
    }
    else if (this.props.type === 'scatter') {
      if (this.props.scope === 'local') {
        return (
          <LineChart
            colorAccessor={(d, idx) => this.props.leaders.findIndex( leader => leader.site === this.props.site)}
            {...generalSettings}
            data={this.props.refusePlotPoints.filter( (site) => site.name === this.props.site)}
            {...CHART.axes}
            {...CHART.general}
            {...CHART.line}
            />
        );
      } else if (this.props.scope === 'global') {
        return (
          <LineChart
            colorAccessor={(d, idx) => idx}
            {...generalSettings}
            data={this.props.refusePlotPoints}
            {...CHART.axes}
            {...CHART.general}
            {...CHART.line}
            />
        );
      }
    }
  }

  renderHeader() {
    return (
      <div className={styles.line_chart_header}>
        {this.state.title}
      </div>
    );
  }

  render() {
    if (this.props.refusePlotPoints === undefined || this.props.diversionPlotPoints === undefined) return (<div></div>);

    return (
      <div className={styles.line_chart_view}>

        {this.renderHeader()}

        <div className={styles.xLabel_chart_and_legend_container}>
          <div className={styles.yLabel_container}>
            <div className={styles.yAxisLabel}>{this.state.yLabel}</div>
          </div>

          <div className={styles.chart_container}>
            <ContainerDimensions>
              { ({ height, width }) => this.renderChart(height, width) }
            </ContainerDimensions>
          </div>

          <ChartLegend>
          </ChartLegend>
        </div>

        <div className={styles.xAxisLabel}>{this.state.xLabel}</div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  refusePlotPoints: state.records.refusePlotPoints,
  diversionPlotPoints: state.records.diversionPlotPoints,
  site: state.currentView.site,
  scope: state.currentView.scope,
  leaders: state.records.leaders,
  dateRange: state.records.dateRange,
  daysInRange: state.records.daysInRange
});

export default connect(mapStateToProps)(Chart);
