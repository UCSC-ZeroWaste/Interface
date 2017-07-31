import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ViewTemplate from './views/_ViewTemplate';
import LeaderBoard from './views/LeaderBoard.jsx';
import LineChart from './views/LineChart.jsx';

class DataVisualization extends Component {
  constructor(props) {
    super(props);
  }

  renderView() {
    switch(this.props.currentView) {
      case 1:
        return <_ViewTemplate title={'view1'} view={1}/>;
      case 2:
        return <_ViewTemplate title={'view2'} view={2}/>;
      case 3:
        return <LeaderBoard view={3}/>;
      case 4:
        return <LineChart view={4}/>;
      case 5:
        return <_ViewTemplate title={'view5'} view={5}/>;
      default:
        return 6;
    }
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  currentView: state.currentView
});

// export default DataVisual;
export default connect(mapStateToProps)(DataVisualization);
