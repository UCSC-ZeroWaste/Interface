var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      site: undefined
    };
  },

  setSite: function(e) {
    e.preventDefault();
    this.setState({
      site: e.target.value
    });
  },

  render: function () {
    if (!this.props.records.recordset) return(<h1>Could not get data.</h1>);
    var sites = _.groupBy(this.props.records.recordset, 'CustomerName');
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
          { React.cloneElement(this.props.children,
          { site: selectedSite }) }
        </div>
        );
  }
});
