var React = require('react');
var _ = require('underscore');
var LineChart = require('react-d3-basic').LineChart;
var d3 = require('d3');

module.exports = React.createClass({
  parseSiteData: function(data){
    return _.map(data,
      function(entry, i) {
        return { 'quantity' : entry.Quantity,
                  'picked_up' : entry.PickupTime,
                  'index' : i };
      }
    );
  },
  getInitialState: function() {
    return {
      width: 600,
      height: 400,
      xLabel: "Date",
      x: function(d) {
        var parseTime = d3.timeFormat("%Y-%m-%d");
        return new Date(d.picked_up).valueOf()
      },
      yLabel: "Weight",
      yLabelPosition: 'right'
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.site.data != undefined) {
      this.setState({
        series: [{
          field: 'quantity',
          name:  nextProps.site.name + ' - Site Waste Weight',
          color: '#c0c0c0',
          style: {
            "strokeWidth": 8,
          }
        }]
      })
    }
  },
  render() {
    if (this.props.site.data == undefined) return(<div></div>);
    console.log("Site Data: ", this.parseSiteData(this.props.site.data))
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
});
