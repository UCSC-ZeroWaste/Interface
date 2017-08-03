import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ViewTemplate from './views/_ViewTemplate';
import LeaderBoard from './views/LeaderBoard.jsx';
import LineChart from './views/LineChart.jsx';
import SizeView from './views/SizeView.jsx';

class DataVisualization extends Component {
  constructor(props) {
    super(props);
  }

  renderView() {
    switch(this.props.currentView) {
      case 'LeaderBoard':
        return <LeaderBoard />;
      case 'LineChart':
        return <LineChart />;
      case 'SizeView':
        return <SizeView />;
      case 'button4':
        return <_ViewTemplate title={'Empty View 4'}/>;
      case 'button5':
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
