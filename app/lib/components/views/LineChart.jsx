import React, {Component} from 'react';
import _ from 'underscore';


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
    // console.log(this.props.site, this.props.records);
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
    let sitePickups = this.props.records[site]
      .filter( (datum) => (datum.Product === this.state.wasteType))
      .map((datum, i) => ({
        'x' : new Date(datum.PickupTime),
        'y' : datum.Load,
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
    const parseData = (this.props.type === 'green' ? (site) => this.parseGreenRatioData(site) : (site) => this.parseWasteBreakdown(site) );

    if (this.props.scope === 'global') {
      let sites = _.keys(this.props.records);
      return sites.map( (site) => parseData(site) );
    } else if (this.props.scope === 'local') {
      return [parseData(this.props.site)];
    }
  }

  parseGreenRatioData(siteName) {
    let sitePickups = this.props.records[siteName];
    let firstPickup = _.min(sitePickups, (pickup) => new Date(pickup.PickupTime).valueOf());
    let lastPickup = _.max(sitePickups, (pickup) => new Date(pickup.PickupTime).valueOf());
    let minTime = new Date(firstPickup.PickupTime).valueOf();
    let maxTime = new Date(lastPickup.PickupTime).valueOf();
    let numDaysInCycle = Math.floor(this.getTimeDiff(minTime, maxTime)) - this.state.rollingAverageLength;

    //create empty arrays of n days
    let totalLoad = Array(numDaysInCycle).fill(0);
    let totalRefuse = Array(numDaysInCycle).fill(0);

    sitePickups.forEach( (pickup) => {
      let thisTime = new Date(pickup.PickupTime).valueOf();
      let timeDiff = Math.floor(this.getTimeDiff(thisTime, minTime));
      if (pickup.Product === 'Refuse') {
        for (let i = 0; (i < this.state.rollingAverageLength) && (i + timeDiff < numDaysInCycle); i++) {
          totalRefuse[i + timeDiff] += pickup.Load;
          totalLoad[i + timeDiff] += pickup.Load;
        }
      } else {
        for (let i = 0; (i < this.state.rollingAverageLength) && (i + timeDiff < numDaysInCycle); i++) {
          totalLoad[i + timeDiff] += pickup.Load;
        }
      }
    });
    let greenRatio = [];
    for (let i = 0 ; i < numDaysInCycle; i++) {
      greenRatio.push(
        Math.floor(100 *(totalLoad[i] - totalRefuse[i]) / totalLoad[i])
      );
    }

    // const randColors = ['#a32590', '#57aa40', '#bbc417', '#340893'];

    greenRatio = greenRatio
      .map((ratio, i) => ({
        y : ratio,
        x : i
      }));

    return {
      name: siteName,
      values: greenRatio,
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
        return {x: [undefined,30], y: [0,100]};
      case 'general':
      //TODO needs to update domain range for x axis to change dynamically -- currently static
        return {x: [new Date(new Date().setDate(new Date().getDate()-30)), new Date()], y: [0,]};
      default:
        return {x: [undefined,undefined], y: [undefined,undefined]};
      }
  }

  GetTickInterval() {
    switch (this.props.type) {
      case 'green':
        return {};
      case 'general':
        // return {};
        return {unit: 'day', interval: 5};
      default:
        return {x: [undefined,undefined], y: [undefined,undefined]};
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
        xAxisTickInterval={this.GetTickInterval()}

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
    // console.log('this.props.records', this.props.records);
    if (this.props.records === undefined) return (<div></div>);
    // console.log("Site Data: ", this.parseWasteBreakdown(this.props.records));

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
  //   data= {this.parseWasteBreakdown(this.props.records)}
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
  records: state.records.data,
  site: state.currentView.site,
  scope: state.currentView.scope,
  leaders: state.records.leaders
});

export default connect(mapStateToProps)(LineChartComponent);
