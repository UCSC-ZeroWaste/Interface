var React = require('react');
var styles = require('./App.css');
var Records = require('./lib/components/Records.js');
var SelectRecord = require('./lib/components/SelectRecord.js');
var SiteLineChart = require('./lib/components/SiteLineChart.js');


export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.bap}>
         Zero Waste
        </div>
        <Records>
          <SelectRecord>
            <SiteLineChart/>
          </SelectRecord>
        </Records>
      </div>
    );
  }
}
