import React, {Component} from 'react';
import _ from 'underscore';
import moment from 'moment';

//TODO switch back to 'rd3' when my changes have been accepted
import {LineChart} from 'rd3';

import ChartLegend from './ChartLegend';

import d3 from 'd3';

import {connect} from 'react-redux';
import {WASTE_TYPES, CHART, LEADER_BOARD_COLORS} from '../../constants/constants';
import styles from '../../../App.css';
import ContainerDimensions from 'react-container-dimensions';
import merge from 'lodash/merge';

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.site, this.props.allData);
    this.state = merge(
      {rollingAverageLength: 7,
      wasteType: 'Refuse'},
      this.chartState()
    );

    this.strokeWidth = 6;
    this.strokeDashArray = undefined;//"5,5";

    this.handleSelector = this.handleSelector.bind(this);
    this.setRollingAverageLength = this.setRollingAverageLength.bind(this);
  }

  chartState() {
    if (this.props.type === 'green') {
      var state = {
        title: "Waste Ratio (higher is better)",
        xLabel: "Time Period",
        yLabel: "Ratio",
      };
    } else {
      state = {
        title: "All Waste Data",
        xLabel: "Date",
        yLabel: "Weight",
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

  parseWasteBreakdown(site) {
    let sitePickups = this.props.allData[site]
      .filter( (datum) => (datum.Product === this.state.wasteType))
      .map((datum, i) => ({
        'x' : new Date(datum.PickupTime),
        'y' : datum.Load_Split,
      }));

    return {
      name: site,
      values: sitePickups,
      strokeWidth: this.strokeWidth,
      strokeDashArray: this.strokeDashArray
    };
  }

  handleSelector(e) {
    this.setState({wasteType: e.target.value});
  }

  getTimeDiff(a, b) {
    return Math.abs((a - b) / (3600 * 24 * 1000));
  }

  getData() {
    const parseData = (this.props.type === 'green' ? (site) => this.parseDiversionRatioData(site) : (site) => this.parseWasteBreakdown(site) );

    if (this.props.scope === 'global') {
      let sites = _.keys(this.props.allData);
      return sites.map( (site) => parseData(site) );
    } else if (this.props.scope === 'local') {
      return [parseData(this.props.site)];
    }
  }

  parseDiversionRatioData(siteName) {
    let sitePickups = this.props.allData[siteName];
    //TODO probably can simplify next two lines since data should be in date order

    // let firstPickup = _.min(sitePickups, (pickup) => new Date(pickup.PickupTime).valueOf());
    // let lastPickup = _.max(sitePickups, (pickup) => new Date(pickup.PickupTime).valueOf());
    let oneDayInMsec = 24 * 60 * 60 * 1000;
    let begDateInMsec = new Date(this.props.dateRange[0]).valueOf();
    let endDateInMsec = new Date(this.props.dateRange[1]).valueOf() + oneDayInMsec;
    let timeDiff = endDateInMsec - begDateInMsec;
    // let this.props.daysInRange = Math.floor(this.getDateDiff(begDate, endDate)) - this.state.rollingAverageLength;

    //create empty arrays of n days
    let totalDiverted = Array(this.props.daysInRange).fill(0);
    let totalRefuse = Array(this.props.daysInRange).fill(0);

    sitePickups.forEach( (pickup) => {
      let thisDateInMsec = new Date(pickup.PickupTime).valueOf();
      // let timeDiff = Math.floor(this.getTimeDiff(thisTime, begTime));
      let day = Math.floor((thisDateInMsec - begDateInMsec) / oneDayInMsec);
      if (pickup.Diversion_Type === 'Refuse') {
        totalRefuse[day] += pickup.Load_Split;
      } else if (pickup.Diversion_Type === 'Diverted') {
        totalDiverted[day] += pickup.Load_Split;
      }
    });

    let diversionRatio = [];
    for (let i = 0 ; i < this.props.daysInRange - this.state.rollingAverageLength; i++) {
      let diverted = totalDiverted
        .slice(i, i + this.state.rollingAverageLength)
        .reduce( (total, load) => total + load);
      let refuse = totalRefuse
        .slice(i, i + this.state.rollingAverageLength)
        .reduce( (total, load) => total + load);
      diversionRatio.push(
        Math.floor(100 * diverted /( refuse + diverted ))
      );
    }

    // const randColors = ['#a32590', '#57aa40', '#bbc417', '#340893'];

    diversionRatio = diversionRatio
      .map((ratio, i) => ({
        y : ratio,
        x : new Date(begDateInMsec + (i + this.state.rollingAverageLength) * oneDayInMsec)
      }));

    return {
      name: siteName,
      values: diversionRatio,
      strokeWidth: this.strokeWidth,
      strokeDashArray: this.strokeDashArray
    };
  }

  setRollingAverageLength(e) {
    this.setState({rollingAverageLength: e.target.value});
  }

  renderSelector() {
    let settings;
    switch (this.props.type) {
      case 'green':
        settings = {
          array: _.range(2,30),
          changeHandler: this.setRollingAverageLength,
          defaultValue: 7,
          title: 'Select # of Days for Rolling Average'
        };
        break;
      case 'general':
        settings = {
          array: WASTE_TYPES,
          changeHandler: this.handleSelector,
          defaultValue: 'Refuse',
          title: 'Select a Refuse Type'
        };
        break;
      default:
        break;
    }
    const options = settings.array.map((type) => (
      <option key={ type } value= { type }>
        { type }
      </option>
    ));
    return (
      <select className={styles.selector} onChange={ settings.changeHandler } defaultValue={settings.defaultValue}>
        <option disabled="true">{settings.title}</option>
        { options }
      </select>
    );
  }

  getChartDomain() {
    switch (this.props.type) {
      case 'green':
        // return {x: [undefined, this.props.daysInRange - this.state.rollingAverageLength], y: [0,100]};
        let begRange = moment(this.props.dateRange[0]).add(this.state.rollingAverageLength, 'days');
        console.log(begRange);
        begRange = new Date(begRange);
        console.log(begRange);
        return {x: [begRange, new Date(this.props.dateRange[1])], y: [0,100]};
        // return {x: this.props.dateRange.map( (dateString) => new Date(dateString) ), y: [0,]};
      case 'general':
        // return {x: [new Date(new Date().setDate(new Date().getDate()-30)), new Date()], y: [0,]};
        return {x: this.props.dateRange.map( (dateString) => new Date(dateString) ), y: [0,]};
      default:
        return {x: [undefined,undefined], y: [undefined,undefined]};
      }
  }

  getTickInterval() {
    switch (this.props.type) {
      case 'green':
        return {unit: 'day', interval: this.calculateInterval()};
      case 'general':
        // return {};
        return {unit: 'day', interval: this.calculateInterval()};
      default:
        return {x: [undefined,undefined], y: [undefined,undefined]};
      }
  }
  calculateInterval() {
    if (this.props.daysInRange <= 7) {
      return 1;
    } else if (this.props.daysInRange > 42) {
      return 14;
    } else {
      return 7;
    }
  }
  getXAccessor(){
    switch (this.props.type) {
      case 'green':
        return (d) => {
          // console.log(d.x);
          return d.x;
        };
      case 'general':
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

  renderChart(height, width) {

    const index = this.props.leaders.findIndex( leader => leader.site === this.props.site );
    const chartColorsArray = (
      this.props.scope === 'local' ?
      [LEADER_BOARD_COLORS[index]] :
      LEADER_BOARD_COLORS
    );
    // xAxisLabel={options.xLabel}
    // xAxisLabelOffset={width * .04}
    // yAxisLabel={options.yLabel}
    // yAxisLabelOffset={height * .07}

    return (
      //TODO get a handle on color & colorAccessor props
      <LineChart

        data={this.getData()}
        width={width}
        height={height}
        colors={ (colorAccessorFunc) => chartColorsArray[colorAccessorFunc] }
        colorAccessor={(d, idx) => idx}

        circleRadius={0}
        viewBoxObject={{
          x: 0,
          y: height * -.04,
          width: Number(width) * 1,
          height: Number(height) * 1
        }}

        domain={this.getChartDomain()}
        xAxisTickInterval={this.getTickInterval()}
        xAccessor={this.getXAccessor()}

        {...CHART.axes}
        {...CHART.settings}

      />
    );
  }

  renderHeader() {
    console.log(this.state.title);
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
    // console.log('this.props.allData', this.props.allData);
    if (this.props.allData === undefined) return (<div></div>);
    // console.log("Site Data: ", this.parseWasteBreakdown(this.props.allData));

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
            {this.renderSelector()}
          </ChartLegend>
        </div>

        <div className={styles.xAxisLabel}>{this.state.xLabel}</div>

      </div>
    );

  }


  // {this.renderWasteTypeSelector()}
  // <LineChart
  //
  //   data= {this.parseWasteBreakdown(this.props.allData)}
  //   chartSeries= {[{
  //     field: 'quantity',
  //     name:  this.props.site + ' - Site Waste Weight',
  //     color: '#c0c0c0',
  //     style: {
  //       "strokeWidth": 6,
  //     }
  //   }]}
  //   width={this.state.width}
  //   height={this.state.height}
  //   xLabel= {this.state.xLabel}
  //   x= {this.state.x}
  //   xScale= 'time'
  //   yLabel= {this.state.yLabel}
  //   yLabelPosition = {this.state.yLabelPosition}
  //   />
}


const mapStateToProps = (state) => ({
  allData: state.records.data,
  site: state.currentView.site,
  scope: state.currentView.scope,
  leaders: state.records.leaders,
  dateRange: state.records.dateRange,
  daysInRange: state.records.daysInRange
});

export default connect(mapStateToProps)(LineChartComponent);
