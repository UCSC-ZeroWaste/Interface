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
    console.log(this.props.site, this.props.siteRecords);
    this.state = {
      rollingAverageLength: 7,
      wasteType: 'Refuse',
      width: 900,
      height: 400,
      xLabel: "Date",
      yLabel: "Weight",
      yLabelPosition: 'right'
    };


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

  parseSiteData(data) {
    data = data
      .filter( (datum) => (datum.Product === this.state.wasteType))
      .map((datum, i) => ({
        'x' : new Date(datum.PickupTime),
        'y' : datum.Load,
      }));

      console.log('pickup date', data);

      return [{
        name: 'site name goes here',
        values: data,
        strokeWidth: 6,
        strokeDashArray: "5,5"
      }];
  }

  handleSelector(e) {
    this.setState({wasteType: e.target.value});
  }

  getTimeDiff(a, b) {
    return Math.abs((a - b) / (3600 * 24 * 1000));
  }

  parseGreenRatioData(sitePickups) {
    let firstPickup = _.min(sitePickups, (pickup) => new Date(pickup.PickupTime).valueOf());
    let minTime = new Date(firstPickup.PickupTime).valueOf();
    let lastPickup = _.max(sitePickups, (pickup) => new Date(pickup.PickupTime).valueOf());
    let maxTime = new Date(lastPickup.PickupTime).valueOf();
    let daysLength = Math.floor(this.getTimeDiff(minTime, maxTime)) - this.state.rollingAverageLength;
    let totalLoad = Array(daysLength).fill(0);
    let totalRefuse = Array(daysLength).fill(0);

    sitePickups.forEach( (pickup) => {
      let thisTime = new Date(pickup.PickupTime).valueOf();
      let timeDiff = Math.floor(this.getTimeDiff(thisTime, minTime));
      if (pickup.Product === 'Refuse') {
        for (let i = 0; (i < this.state.rollingAverageLength) && (i + timeDiff < daysLength); i++) {
          totalRefuse[i + timeDiff] += pickup.Load;
          totalLoad[i + timeDiff] += pickup.Load;
        }
      } else {
        for (let i = 0; (i < this.state.rollingAverageLength) && (i + timeDiff < daysLength); i++) {
          totalLoad[i + timeDiff] += pickup.Load;
        }
      }
    });
    let greenRatio = [];
    for (let i = 0 ; i < daysLength; i++) {
      greenRatio.push(
        Math.floor(100 *(totalLoad[i] - totalRefuse[i]) / totalLoad[i])
      );
    }

    greenRatio = greenRatio
      .map((ratio, i) => ({
        y : ratio,
        x : i,
      }));

    return [{
      name: 'site name goes here',
      values: greenRatio,
      strokeWidth: 2,
      strokeDashArray: "5,5",
    }];
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

//   renderWasteTypeSelector() {
//     const wasteTypes = WASTE_TYPES.map((type) => (
//       <option key={ type } value= { type }>
//         { type }
//       </option>
//     )
//   );
//
//   return (
//     <select onChange={ this.handleSelector } defaultValue={'Refuse'}>
//       <option disabled="true">Select a Refuse Type</option>
//       { wasteTypes }
//     </select>
//   );
// }

  // renderRollingAverageLengthSelector() {
  //   const daysOptions = _.range(5,30).map((days) => (
  //       <option key={ days } value= { days }>
  //         { days }
  //       </option>
  //     )
  //   // );
  //
  //   return (
  //     <select onChange={ this.setRollingAverageLength }>
  //       <option value="">Select # of Days for Rolling Average</option>
  //       { daysOptions }
  //     </select>
  //   );
  // }

  getChartDomain() {
    switch (this.props.type) {
      case 'green':
        return {x: [,30], y: [0,]};
      case 'general':
      //TODO needs to update domain range for x axis to change dynamically -- currently static
        return {x: [new Date('Jul 07 2017'), new Date('Aug 07 2017')], y: [0,]};
      default:
        return {x: [,], y: [,]};
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
        return {x: [,], y: [,]};
      }

  }

  renderChart() {
    let options = {};
    switch (this.props.type) {
      case 'green':
        options = {
          data: this.parseGreenRatioData(this.props.siteRecords),
          title: "Waste Ratio (higher is better)"
        };
        break;
      case 'general':
        options = {
          data: this.parseSiteData(this.props.siteRecords),
          title: "All Waste Data"
        };
        break;
      default:
        options = {data: {}};
    }
    console.log('Chart Data:', options.data);
    // var lineData = [
    //   {
    //     name: 'series1',
    //     values: [ { x: 0, y: 20}, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
    //     strokeWidth: 3,
    //     strokeDashArray: "5,5",
    //   },
    //   {
    //     name: 'series2',
    //     values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
    //   },
    //   {
    //     name: 'series3',
    //     values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
    //   }
    // ];

    return (
      <LineChart
        legend={true}
        data={options.data}
        width='100%'
        height={this.state.height}
        hoverAnimation={true}
        circleRadius={4}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: this.state.width,
          height: this.state.height
        }}
        title={this.props.site + ' - ' + options.title}
        yAxisLabel={this.state.yLabel}
        xAxisLabel={this.state.xLabel}

        domain={this.getChartDomain()}
        xAxisTickInterval={this.GetTickInterval()}

        gridHorizontal={true}
        gridVertical={true}
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
    console.log('this.props.siteRecords', this.props.siteRecords);
    if (this.props.siteRecords === undefined) return (<div></div>);
    console.log("Site Data: ", this.parseSiteData(this.props.siteRecords));

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
  //   data= {this.parseSiteData(this.props.siteRecords)}
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
  siteRecords: _.groupBy(state.records, 'Site')[state.site],
  site: state.site
});

export default connect(mapStateToProps)(LineChartComponent);
