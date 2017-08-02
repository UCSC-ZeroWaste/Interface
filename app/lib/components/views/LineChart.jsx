import React, {Component} from 'react';
import _ from 'underscore';
import {LineChart} from 'react-d3-basic';
import d3 from 'd3';
import {connect} from 'react-redux';

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.site, this.props.siteRecords);
    this.state = {
      width: 600,
      height: 400,
      xLabel: "Date",
      x: function(d) {
        // let parseTime = d3.timeFormat("%c");
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

  render() {
    if (this.props.siteRecords === undefined) return (<div></div>);
    // console.log("Site Data: ", this.parseSiteData(this.props.siteRecords));
    return (
      <div>
        <LineChart
          data= {this.parseSiteData(this.props.siteRecords)}
          chartSeries= {[{
                  field: 'quantity',
                  name:  this.props.site + ' - Site Waste Weight',
                  color: '#c0c0c0',
                  style: {
                    "strokeWidth": 6,
                  }
                }]}
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

const mapStateToProps = (state) => ({
  siteRecords: _.groupBy(state.records.recordset, 'Site')[state.site],
  site: state.site
});

export default connect(mapStateToProps)(LineChartComponent);
