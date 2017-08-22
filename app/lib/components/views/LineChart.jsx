import React, {Component} from 'react';
import _ from 'underscore';
import {LineChart} from 'rd3';
import d3 from 'd3';
import {connect} from 'react-redux';
import {WASTE_TYPES} from '../../constants/constants';
import styles from '../../../App.css';

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.site, this.props.records);
    this.state = {
      rollingAverageLength: 7,
      wasteType: 'Refuse',
      width: 700,
      height: 400,
    };
    this.strokeWidth = 6;
    this.strokeDashArray = undefined;//"5,5";

    this.handleSelector = this.handleSelector.bind(this);
    this.setRollingAverageLength = this.setRollingAverageLength.bind(this);
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
          defaultValue: 'Refuse',
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
      <select onChange={ settings.changeHandler } defaultValue={settings.defaultValue}>
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

  renderChart() {

    if (this.props.type === 'green') {
      var options = {
        title: "Waste Ratio (higher is better)",
        xLabel: "Time Period",
        yLabel: "Ratio",
      };
    } else {
      options = {
        title: "All Waste Data",
        xLabel: "Date",
        yLabel: "Weight",
      };
    }

    return (
      //TODO get a handle on color & colorAccessor props
      <LineChart
        legend={true}
        data={this.getData()}
        width='100%'
        height={this.state.height + 100}
        hoverAnimation={false}
        circleRadius={4}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: this.state.width,
          height: this.state.height
        }}
        title={this.props.site + ' - ' + options.title}

        yAxisLabel={options.yLabel}
        xAxisLabel={options.xLabel}




        domain={this.getChartDomain()}
        xAxisTickInterval={this.GetTickInterval()}
        gridHorizontal={false}
        gridVertical={false}
      />
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
      <div className={styles.line_chart_container}>
        {this.renderSelector()}
        {this.renderChart()}
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
});

export default connect(mapStateToProps)(LineChartComponent);
