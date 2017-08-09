import React, {Component} from 'react';
import styles from '../../../App.css';

export default class LeaderRow extends Component {
  constructor(props) {
    super(props);
    this.state = ({width: '10px'});
    // this.renderSlug = this.renderSlug.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate() {
    if (this.state.width !== this.refs.leader_row.clientHeight + 'px') {
      this.updateState();
    } else {
      // console.log('done updating ranks width', this.state);
    }
  }

  renderSlug() {
    if (this.props.selected) {
      return (
        <div className={styles.slug} style={this.state}></div>
      );
    } else {
      return (<div className={styles.slug_not_selected} style={this.state}></div>);
    }
  }

  updateState() {
    this.setState({
      width: this.refs.leader_row.clientHeight + 'px'
    });
  }

  render() {
    let details = this.props.selected ? styles.details_selected : styles.details;
    let ranking = this.props.selected ? styles.rank_selected : styles.rank;
    // console.log("this.props: ", this.props);
    return (
      <div className={styles.leaderRow} ref="leader_row">
        {this.renderSlug()}
        <div className={ranking} style={this.state}>{this.props.rank}</div>
        <div className={details}>
          <div>{this.props.site.site}</div>
          <div>{Math.round(this.props.site.greenRatio)}%</div>
        </div>
      </div>
    );

  }
}
