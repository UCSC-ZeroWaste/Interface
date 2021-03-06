import React, {Component} from 'react';
import _ from 'underscore';
import moment from 'moment';

//TODO switch back to 'rd3' when my changes have been accepted
import {ScatterChart} from 'rd3';

import ChartLegend from './ChartLegend';

import d3 from 'd3';

import {connect} from 'react-redux';
import {WASTE_TYPES, LEADER_BOARD_COLORS} from '../../constants/constants';
import {CHART} from '../../constants/settings';
import styles from '../../../App.scss';
import ContainerDimensions from 'react-container-dimensions';
import merge from 'lodash/merge';

class ScatterChartComponent extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.site, this.props.allData);
    this.state = merge(
      {rollingAverageLength: 7,
      wasteType: 'Refuse'},
      this.chartState()
    );

    this.diversionChartStrokeWidth = 4;
    this.diversionChartCircleRadius = 4; //TODO set to zero
    this.diversionChartStrokeDashArray = undefined;//"5,5";

    this.refuseChartStrokeWidth = 0;
    this.refuseChartCircleRadius = 7;
    this.refuseChartStrokeDashArray = undefined;//"5,5";

    this.handleSelector = this.handleSelector.bind(this);
    this.setRollingAverageLength = this.setRollingAverageLength.bind(this);
  }

  chartState() {
    if (this.props.type === 'diversion') {
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

  handleSelector(e) {
    this.setState({wasteType: e.target.value});
  }

  getTimeDiff(a, b) {
    return Math.abs((a - b) / (3600 * 24 * 1000));
  }

  getData() {
    const parseData = (this.props.type === 'diversion' ? (siteName) => this.parseDiversionData(siteName) : (siteName) => this.parseRefuseData(siteName) );

    if (this.props.scope === 'global') {
      let sites = _.keys(this.props.allData);
      return sites.map( (site) => parseData(site) );
    } else if (this.props.scope === 'local') {
      return [parseData(this.props.site)];
    }
  }

  parseRefuseData(siteName) {
    let sitePickups = this.props.allData[siteName]
    .filter( (datum) => (datum.Product === this.state.wasteType))
    .map((datum, i) => ({
      'x' : new Date(datum.PickupTime),
      'y' : datum.Load_Split,
      'name': siteName
    }));

    return {
      name: siteName,
      values: sitePickups,
    };
  }

  parseDiversionData(siteName) {
    let sitePickups = this.props.allData[siteName];
    //TODO probably can simplify next two lines since data should be in date order

    // let firstPickup = _.min(sitePickups, (pickup) => new Date(pickup.PickupTime).valueOf());
    // let lastPickup = _.max(sitePickups, (pickup) => new Date(pickup.PickupTime).valueOf());
    let oneDayInMsec = 24 * 60 * 60 * 1000;
    let begDateInMsec = new Date(this.props.dateRange[0]).valueOf();
    let endDateInMsec = new Date(this.props.dateRange[1]).valueOf() + oneDayInMsec;
    let timeDiff = endDateInMsec - begDateInMsec;
    // console.log('should be int: ', (timeDiff + 12)/oneDayInMsec);
    // let this.props.daysInRange = Math.floor(this.getDateDiff(begDate, endDate)) - this.state.rollingAverageLength;

    //create empty arrays of n days
    let totalDiverted = Array(this.props.daysInRange).fill(0);
    let totalRefuse = Array(this.props.daysInRange).fill(0);

    sitePickups.forEach( (pickup, i) => {
      // if (i === 0) console.log('begtime: ', new Date(this.props.dateRange[0]), "i is 0: ", pickup.PickupTime, new Date(pickup.PickupTime));
      let thisDateInMsec = new Date(pickup.PickupTime).valueOf();
      // let timeDiff = Math.floor(this.getTimeDiff(thisTime, begTime));
      let day = Math.floor((thisDateInMsec - begDateInMsec) / oneDayInMsec);
      // console.log(day);
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
      strokeWidth: this.diversionChartStrokeWidth,
      strokeDashArray: this.diversionChartStrokeDashArray,
    };
  }

  setRollingAverageLength(e) {
    this.setState({rollingAverageLength: Number(e.target.value)});
  }

  // NOTE not using selector in production version
  // renderSelector() {
  //   let settings;
  //   switch (this.props.type) {
  //     case 'diversion':
  //       settings = {
  //         array: _.range(2,30),
  //         changeHandler: this.setRollingAverageLength,
  //         defaultValue: 7,
  //         title: 'Select # of Days for Rolling Average'
  //       };
  //       break;
  //     case 'refuse':
  //       settings = {
  //         array: WASTE_TYPES,
  //         changeHandler: this.handleSelector,
  //         defaultValue: 'Refuse',
  //         title: 'Select a Refuse Type'
  //       };
  //       break;
  //     default:
  //       break;
  //   }
  //   const options = settings.array.map((type) => (
  //     <option key={ type } value= { type }>
  //       { type }
  //     </option>
  //   ));
  //   return (
  //     <select className={styles.selector} onChange={ settings.changeHandler } defaultValue={settings.defaultValue}>
  //       <option disabled="true">{settings.title}</option>
  //       { options }
  //     </select>
  //   );
  // }

  getChartDomain() {
    switch (this.props.type) {
      case 'diversion':
        let begRange = moment.utc(this.props.dateRange[0]).add(this.state.rollingAverageLength, 'days');
        let endRange = new Date(this.props.dateRange[1]);
        return {x: [begRange, endRange], y: [0,100]};
      case 'refuse':
        begRange = new Date(this.props.dateRange[0]);
        endRange = moment.utc(this.props.dateRange[1]).add(1, 'days');
        return {x: [begRange, endRange], y: [0,]};
      default:
        return {x: [undefined,undefined], y: [undefined,undefined]};
      }
  }

  getTickInterval() {
    let temp = this.props.type === 'diversion' ? this.state.rollingAverageLength : 0;
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
      case 'diversion':
        return (d) => {
          // console.log(d.x);
          return d.x;
        };
      case 'refuse':
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
    // const chartColorsArray = (
    //   this.props.scope === 'local' ?
    //   [LEADER_BOARD_COLORS[index]] :
    //   LEADER_BOARD_COLORS
    // );

    const chartColorsArray = LEADER_BOARD_COLORS;



    // xAxisLabel={options.xLabel}
    // xAxisLabelOffset={width * .04}
    // yAxisLabel={options.yLabel}
    // yAxisLabelOffset={height * .07}

    return (
      //TODO get a handle on color & colorAccessor props
      <ScatterChart

        data={this.getData()}
        width={width}
        height={height}
        colors={ (colorAccessorFunc) => chartColorsArray[colorAccessorFunc] }
        colorAccessor={(d, idx) => {
          let siteName = (this.props.scope === 'local' ? this.props.site : d.name);





          let leaderBoardIndexValue = this.props.leaders.findIndex( leader => leader.site === siteName );

          if (idx === 8 && this.props.type === 'refuse' && this.props.scope === 'global') {
            console.log(`colorAccessor for ${this.props.type} d: ${d} and idx: ${idx}`);
            console.log(d);
            console.log(leaderBoardIndexValue);
          }

          if (leaderBoardIndexValue >= 0) {
            // console.log(siteName, leaderBoardIndexValue, this.props.type);
            return leaderBoardIndexValue;
          } else {
            return idx;
          }
        }}

        circleRadius={this.props.type === 'diversion' ? this.diversionChartCircleRadius : this.refuseChartCircleRadius}
        viewBoxObject={{
          x: 0,
          y: height * -.04,
          width: Number(width) * 1,
          height: Number(height) * 1
        }}

        domain={this.getChartDomain()}
        xAccessor={this.getXAccessor()}
        xAxisTickInterval={this.getTickInterval()}

        {...CHART.axes}
        {...CHART.settings}

      />
    );
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
    // console.log('this.props.allData', this.props.allData);
    if (this.props.allData === undefined) return (<div></div>);
    // console.log("Site Data: ", this.parseRefuseData(this.props.allData));

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


  // {this.renderWasteTypeSelector()}
  // <LineChart
  //
  //   data= {this.parseRefuseData(this.props.allData)}
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

export default connect(mapStateToProps)(ScatterChartComponent);
