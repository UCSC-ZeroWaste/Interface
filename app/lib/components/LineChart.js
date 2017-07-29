import React, {Component} from 'react';
import _ from 'underscore';
import {LineChart} from 'react-d3-basic';
import d3 from 'd3';

export default class LineChartComponent extends Component {
  constructor() {
    super();
    this.state = {
      width: 600,
      height: 400,
      xLabel: "Date",
      x: function(d) {
        // var parseTime = d3.timeFormat("%c");
        return new Date(d.picked_up).valueOf();
      },
      yLabel: "Weight",
      yLabelPosition: 'right'
    };
  }

  parseSiteData(data) {
    return _.map(data,
      function(entry, i) {
        return { 'quantity' : entry.Load,
                 'picked_up' : entry.PickupTime,
                 'index' : i };
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.site.data !== undefined) {
      this.setState({
        series: [{
          field: 'quantity',
          name:  nextProps.site.name + ' - Site Waste Weight',
          color: '#c0c0c0',
          style: {
            "strokeWidth": 6,
          }
        }]
      });
    }
  }

  render() {
    if (this.props.site.data === undefined) return (<div></div>);
    console.log("Site Data: ", this.parseSiteData(this.props.site.data));
    return (
      <div>
        <LineChart
          data= {this.parseSiteData(this.props.site.data)}
          chartSeries= {this.state.series}
          xLabel= {this.state.xLabel}
          x= {this.state.x}
          xScale= 'time'
          yLabel= {this.state.yLabel}
          yLabelPosition = {this.state.yLabelPosition}
        />
      </div>
    );
  }
}
