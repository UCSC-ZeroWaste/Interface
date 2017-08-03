import React, {Component} from 'react';
import _ from 'underscore';
import {connect} from 'react-redux';
import {handleSiteSelect} from '../../actions/views';
import {COLLEGE_SET} from '../../constants/constants';

class SiteSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {site: undefined};
    this.setSite = this.setSite.bind(this);
  }

  setSite(e) {
    this.setState({site: e.target.value});
    this.props.handleSiteSelect(e.target.value);
  }

  render() {
    // if (!this.props.records.recordset) return (<h1>Could not get data.</h1>);
    // const sites = _.groupBy(this.props.records.recordset, 'Site');

    const siteOptions = COLLEGE_SET.map((site) => (
        <option key={ site } value= { site }>
          { site }
        </option>
      )
    );

    return (
        <div>
          <select name="record" onChange={ this.setSite }>
            <option value="">Select a Site</option>
            { siteOptions }
          </select>
        </div>
        );
  }
}


const mapStateToProps = (state) => ({
  records: state.records
});

const mapDispatchToProps = (dispatch) => ({
  handleSiteSelect: (site) => dispatch(handleSiteSelect(site))
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteSelector);
