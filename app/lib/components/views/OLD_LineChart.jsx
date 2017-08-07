import React, {Component} from 'react';
import _ from 'underscore';
import {LineChart} from 'react-d3-basic';
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
      x: function(d) {
        // let parseTime = d3.timeFormat("%c");
        return new Date(d.picked_up).valueOf();
      },
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
    return data
      .filter( (datum) => (datum.Product === this.state.wasteType))
      .map((datum, i) => ({
        'quantity' : datum.Load,
        'picked_up' : datum.PickupTime,
        'index' : i
      }));
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
        (totalLoad[i] - totalRefuse[i]) / totalLoad[i]
      );
    }

    return greenRatio
      .map((ratio, i) => ({
        'quantity' : ratio,
        'picked_up' : i,
        'index' : i
      }));
  }

  setRollingAverageLength(e) {
    this.setState({rollingAverageLength: e.target.value});
  }

  renderSelector() {
    let settings;
    switch (this.props.type) {
      case 'green':
        settings = {
          array: _.range(5,30),
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

  renderChart() {
    let options = {};
    switch (this.props.type) {
      case 'green':
        options = {data: this.parseGreenRatioData(this.props.siteRecords)};
        break;
      case 'general':
        options = {data: this.parseSiteData(this.props.siteRecords)};
        break;
      default:
        options = {data: {}};
    }

    return (
      <LineChart
      data= {options.data}
      chartSeries= {[{
        field: 'quantity',
        name:  this.props.site + ' - Site Waste Weight',
        color: '#c0c0c0',
        style: {
          "strokeWidth": 6,
        }
      }]}
      width={this.state.width}
      height={this.state.height}
      xLabel= {this.state.xLabel}
      x= {this.state.x}
      xScale= 'time'
      yLabel= {this.state.yLabel}
      yLabelPosition = {this.state.yLabelPosition}
      />)
    ;
  }

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
