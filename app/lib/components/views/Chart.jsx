import React, {Component} from 'react';
import _ from 'underscore';
import moment from 'moment';

//TODO switch back to 'rd3' when my changes have been accepted
import {LineChart, ScatterChart} from 'rd3';

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

    // this.diversionChartStrokeWidth = 4;
    this.diversionChartCircleRadius = 4; //TODO set to zero
    // this.diversionChartStrokeDashArray = undefined;//"5,5";

    // this.refuseChartStrokeWidth = 0;
    this.refuseChartCircleRadius = 7;
    // this.refuseChartStrokeDashArray = undefined;//"5,5";

    // this.handleSelector = this.handleSelector.bind(this);
    // this.setRollingAverageLength = this.setRollingAverageLength.bind(this);
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

  componentDidMount() {
    // console.log('widthreceiveprops', this.props.widtha);
    // console.log('WIDTH',this.refs.childNode.parentNode);
    // width={this.refs.parentNode}
  }

  componentWillReceiveProps(nextProps){
    // console.log('widthreceiveprops', nextProps);
    // console.log('WIDTH',this.refs.childNode.parentNode);
  //  this.refs.chart.onWindowResized();
 }

  getTimeDiff(a, b) {
    return Math.abs((a - b) / (3600 * 24 * 1000));
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
        return {x: [begRange, endRange], y: [0,]};
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

  //TODO Don't think I need this. Also delete from chart props.
  getXAccessor(){
    switch (this.props.type) {
      case 'line':
        return (d) => {
          // console.log(d.x);
          return d.x;
        };
      case 'scatter':
        // return {};
        return (d) => {
          // var formatter = d3.time.format("%Y-%m-%d").parse;
          // return formatter(d.x.slice(0,10));
            // console.log(d.x);
            return d.x;
            // return new Date(d.x);
          };
      default:
        return {};
      }
  }


  getData() {
    if (this.props.type === 'line') {
      if (this.props.scope === 'local') {
        return this.props.diversionPlotPoints.filter( (site) => site.name === this.props.site);
      } else {
        return this.props.diversionPlotPoints;
      }
    }
    else if (this.props.type === 'scatter') {
      if (this.props.scope === 'local') {
        return this.props.refusePlotPoints.filter( (site) => site.name === this.props.site);
      } else {
        return this.props.refusePlotPoints;
      }
    }
  }

  renderChart(height, width) {
    const index = this.props.leaders.findIndex( leader => leader.site === this.props.site );
    // const chartColorsArray = (
    //   this.props.scope === 'local' ?
    //   [LEADER_BOARD_COLORS[index]] :
    //   LEADER_BOARD_COLORS
    // );

    const chartColorsArray = LEADER_BOARD_COLORS;
    let settings = {
      data: this.getData(),
      width: width,
      height: height,
      colors: (colorAccessorFunc) => chartColorsArray[colorAccessorFunc],
      colorAccessor: (d, idx) => {
        let siteName = (this.props.scope === 'local' ? this.props.site : d.name);
        let leaderBoardIndexValue = this.props.leaders.findIndex( leader => leader.site === siteName );

        // if (!d.name && idx === 8 && this.props.type === 'line' && this.props.scope === 'global') {
        //   console.log(`colorAccessor for ${this.props.type} d: ${d} and idx: ${idx}`);
        //   console.log(d.name);
        //   console.log(leaderBoardIndexValue);
        // }

        if (leaderBoardIndexValue >= 0) {
          // console.log(siteName, leaderBoardIndexValue, this.props.type);
          return leaderBoardIndexValue;
        } else {
          return idx;
        }
      },

      circleRadius: this.props.type === 'line' ? this.diversionChartCircleRadius : this.refuseChartCircleRadius,
      viewBoxObject: {
        x: 0,
        y: height * -.04,
        width: Number(width) * 1,
        height: Number(height) * 1
      },
      domain: this.getChartDomain(),
      xAccessor: this.getXAccessor(),
      xAxisTickInterval: this.getTickInterval()
    };


    // xAxisLabel={options.xLabel}
    // xAxisLabelOffset={width * .04}
    // yAxisLabel={options.yLabel}
    // yAxisLabelOffset={height * .07}
    if (this.props.type === 'line') {
      return (
        <LineChart
          xAxisStrokeWidth='3'
          yAxisStrokeWidth='3'
          {...settings}
          {...CHART.axes}
          {...CHART.settings}
        />
      );
    }
    else if (this.props.type === 'scatter') {
      return (
        <ScatterChart
          xAxisStrokeWidth={3}
          yAxisStrokeWidth={3}
          {...settings}
          {...CHART.axes}
          {...CHART.settings}
        />
      );
    }
  }
  // xAxisTickInterval={{unit: 'day', interval: 21}}
  // xAxisTickInterval={{unit: 'day', interval: this.calculateTickInterval()}}

  renderHeader() {
    return (
      <div className={styles.line_chart_header}>
        {this.state.title}
      </div>
    );
  }
  // <LineChart
  //   data= {options.data}
  //   x= {(d) => new Date(d.picked_up).valueOf()}
  //   xScale= 'time'
  //   yLabelPosition = {this.state.yLabelPosition}
  //   />

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
