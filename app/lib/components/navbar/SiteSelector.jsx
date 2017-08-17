import React, {Component} from 'react';
import _ from 'underscore';
import {connect} from 'react-redux';
import {handleSiteSelect} from '../../actions/view_actions';
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

    const siteOptions = COLLEGE_SET.map((site) => (
        <option key={ site } value= { site }>
          { site }
        </option>
      )
    );

    return (
        <div>
          <select onChange={ this.setSite }>
            <option value="">Select a Site</option>
            <option value="">ALL COLLEGES</option>
            { siteOptions }
          </select>
        </div>
        );
  }
}


const mapStateToProps = (state) => ({
  records: state.records.data
});

const mapDispatchToProps = (dispatch) => ({
  handleSiteSelect: (site) => dispatch(handleSiteSelect(site))
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteSelector);
