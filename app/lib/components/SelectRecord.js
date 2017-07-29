import React, {Component} from 'react';
import _ from 'underscore';
import LineChart from './LineChart.js';

export default class SelectRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {site: undefined};
    this.setSite = this.setSite.bind(this);
  }

  setSite(e) {
    this.setState({site: e.target.value});
  }

  render() {
    if (!this.props.records.recordset) return (<h1>Could not get data.</h1>);
    var sites = _.groupBy(this.props.records.recordset, 'Site');
    var siteOptions = _.map(sites, function (record, site) {
      return <option key={ site } value= { site }>
      { site }
      </option>;
    });
    var selectedSite = {};
    if (this.state.site) selectedSite = { name: this.state.site, data: sites[ this.state.site ] };

    return (
        <div>
          <select name="record" onChange={ this.setSite }>
            <option value="">Select a Site</option>
            { siteOptions  }
          </select>
          <LineChart site={selectedSite}/>
        </div>
        );
  }
}
