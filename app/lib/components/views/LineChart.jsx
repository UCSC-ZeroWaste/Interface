import React, {Component} from 'react';
import _ from 'underscore';
import {LineChart} from 'react-d3-basic';
import d3 from 'd3';
import {connect} from 'react-redux';
import {WASTE_TYPES} from '../../constants/constants';

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.site, this.props.siteRecords);
    this.state = {
      wasteType: '',
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
    this.handleSelector = this.handleSelector.bind(this);
  }

  parseSiteData(data) {
    return data
      .filter( (datum) => (datum.AssetType === this.state.wasteType))
      .map((datum, i) => ({
        'quantity' : datum.Load,
        'picked_up' : datum.PickupTime,
        'index' : i
      }));
  }

  handleSelector(e) {
    this.setState({wasteType: e.target.value});
  }

  renderWasteTypeSelector() {
    const wasteTypes = WASTE_TYPES.map((type) => (
        <option key={ type } value= { type }>
          { type }
        </option>
      )
    );

    return (
        <div>
          <select onChange={ this.handleSelector } defaultValue={'Refuse'}>
            <option disabled="true">Select a Refuse Type</option>
            { wasteTypes }
          </select>
        </div>
        );
  }

  render() {
    if (this.props.siteRecords === undefined) return (<div></div>);
    // console.log("Site Data: ", this.parseSiteData(this.props.siteRecords));
    return (
      <div>

        {this.renderWasteTypeSelector()}

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
