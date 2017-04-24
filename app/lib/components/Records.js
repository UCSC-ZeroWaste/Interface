var React = require('react');

var Store = require('../stores/Store');
var ActionCreator = require('../actions/ActionCreator');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      records: []
    };
  },

  componentWillMount: function () {
    Store.addChangeListener(this._onChange);
  },
  // Use the ActionCreator to get the records.
  componentDidMount: function () {
    ActionCreator.getRecords();
  },

  componentWillUnmount: function () {
    Store.removeChangeListener(this._onChange);
  },
  /**
   ** Update the state of records for this component.
   ** This will get called when our store handles the response
   ** from the action.
   **/
  _onChange: function () {
    this.setState({
      records: Store.getRecords()
    });
  },

  render: function () {
    return (
        <div>
        { React.cloneElement(this.props.children,
            { records: this.state.records }) }
        </div>
        )
  }
});
