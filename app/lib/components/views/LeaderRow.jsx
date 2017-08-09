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
    if (this.props.selected) {
      return (
        <div className={styles.slug} style={{width: this.state.slugHeight, height: this.state.slugHeight}}></div>
      );
    } else {
      return (<div className={styles.slug_not_selected} style={{width: this.state.slugHeight, height: this.state.slugHeight}}></div>);
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
    let details = this.props.selected ? styles.details_selected : styles.details;
    let ranking = this.props.selected ? styles.rank_selected : styles.rank;
    let color = this.props.selected ? {backgroundColor: this.props.color} : undefined;

    // console.log("this.props: ", this.props);
    return (
      <div className={styles.leader_row} ref="leader_row">

        {this.renderSlug()}

        <div className={ranking} style={merge({backgroundColor: this.props.color}, {width: this.state.rowHeight})}>
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
