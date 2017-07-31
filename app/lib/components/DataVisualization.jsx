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
      case 'leaderBoard':
        return <LeaderBoard/>;
      case 'lineChart':
        return <LineChart/>;
      case 3:
        return <_ViewTemplate title={'Empty View 3'}/>;
      case 4:
        return <_ViewTemplate title={'Empty View 4'}/>;
      case 5:
        return <_ViewTemplate title={'Empty View 5'}/>;
      default:
        return <_ViewTemplate title={'Default View'}/>;
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
