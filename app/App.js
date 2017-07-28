var React = require('react');
var styles = require('./bootstrap/dist/css/bootstrap.css');
var Records = require('./lib/components/Records.js');
var SelectRecord = require('./lib/components/SelectRecord.js');
var SiteLineChart = require('./lib/components/SiteLineChart.js');
var SiteLeaderBoard = require('./lib/components/SiteLeaderBoard.js');
export default class App extends React.Component {
  render() {
    var RecordSet = Records;
    return (
      <div>
        <div className={styles.bap}>
          Zero Waste
        </div>
        <RecordSet>
          <SelectRecord>
            <SiteLineChart/>
          </SelectRecord>
        </RecordSet>
        <Records>
          <SiteLeaderBoard/>
        </Records>
      </div>
    );
  }
}
