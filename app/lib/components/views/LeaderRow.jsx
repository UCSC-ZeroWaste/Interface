import React, {Component} from 'react';
import styles from '../../../App.css';
import merge from 'lodash/merge';

export default class LeaderRow extends Component {
  constructor(props) {
    super(props);
    this.state = {rowHeight: '10px', slugHeight: '10px'};
    // this.renderSlug = this.renderSlug.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate() {
    if (this.state.rowHeight !== this.refs.leader_row.clientHeight + 'px') {
      this.updateState();
    } else {
      // console.log('done updating ranks width', this.state);
    }
  }

  renderSlug() {

    let slugContainer;

    if (this.props.selected) {
      slugContainer = {
        width: this.state.slugHeight,
        height: this.state.slugHeight,
        // position: 'relative'
      };
    } else {
      slugContainer = {
        width: this.state.rowHeight,
        height: this.state.rowHeight,
        // position: 'relative'
      };
    }

    if (this.props.selected) {
      return (
        <div style={slugContainer}>
          <div className={styles.slug}></div>

        </div>
      );
    } else {
      return (
        <div className={styles.slug_container} style={slugContainer}>

        </div>
      );
    }
  }

  updateState() {
    let rowHeight = this.refs.leader_row.clientHeight;
    let slugHeight = rowHeight * 1.2;
    this.setState({
      rowHeight: rowHeight + 'px',
      slugHeight: slugHeight + 'px'
    });
  }

  render() {
    let rowStyle = this.props.selected ? styles.leader_row_selected : styles.leader_row;
    let color = this.props.selected ? {backgroundColor: this.props.color} : undefined;
    let rankingStyle = this.props.selected ? styles.rank_selected : styles.rank;
    let details = this.props.selected ? styles.details_selected : styles.details;

    // console.log("this.props: ", this.props);
    return (
      <div className={rowStyle} ref="leader_row">

        {this.renderSlug()}

        <div className={rankingStyle} style={merge({backgroundColor: this.props.color}, {width: this.state.rowHeight})}>
          {this.props.rank}
        </div>

        <div className={styles.details_container}>
          <div className={details} style={color}>
            <div className={styles.details_site} >{this.props.site.site}</div>
            <div className={styles.details_ratio} >{Math.round(this.props.site.greenRatio)}%</div>
          </div>
        </div>

      </div>
    );

  }
}
