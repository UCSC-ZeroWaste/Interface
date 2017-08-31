import React, {Component} from 'react';
import styles from '../../../App.css';
import merge from 'lodash/merge';
import ContainerDimensions from 'react-container-dimensions';
import {SLUG_IMAGES} from '../../constants/constants';
// import {connect} from 'react-redux';

export default class LeaderRow extends Component {
  constructor(props) {
    super(props);
  }

  renderSlug(height, width) {
    if (this.props.selected) {
      var slugContainer = {
        width: 1.2 * height,
        height: 1.2 * height,
      };
    } else {
      slugContainer = {
        width: height,
        height: height,
      };
    }

    if (this.props.selected) {
      return (
        <div style={slugContainer} className={styles.slugContainer}>
          <img
              style={{
                backgroundColor: this.props.color,
                backgroundImage: `url(${SLUG_IMAGES[this.props.rank - 1]})`
              }}
              className={styles.slug}/>
        </div>
      );
    } else {
      return (
        <div style={slugContainer}/>
      );
    }
  }

  renderRankAndSlug(height, width) {
    return (
      <div className={styles.rank_and_slug_container}>
        {this.renderSlug(height, width)}
        {this.renderRank(height, width)}
      </div>
    );
  }

  renderRank(height, width) {
    if (this.props.selected) {
      var rankContainer = {
        width: 1.0 * height,
        height: 1.0 * height,
        position: 'relative'
      };
      var rankCircleStyle = styles.rank_circle_selected;
    } else {
      rankContainer = {
        width: height,
        height: height,
        position: 'relative'
      };
      rankCircleStyle = styles.rank_circle;
    }
    return (
      <div style={rankContainer}>
        <div className={styles.opacityFixContainer}>
          <div style={{backgroundColor: this.props.color}} className={rankCircleStyle}></div>
        </div>
        <div className={styles.opacityFixContainer}>
          <div className={styles.rank_text}>{ this.props.rank }<sup>{ this.renderRankDegree() }</sup></div>
        </div>
      </div>
    );
  }

  renderRankDegree() {
    switch (this.props.rank) {
      case 1:
      return 'st';
      case 2:
      return 'nd';
      case 3:
      return 'rd';
      default:
      return 'th';
    }
  }

  render() {
    let rowStyle = this.props.selected ? styles.leader_row_selected : styles.leader_row;
    let color = this.props.selected ? {backgroundColor: this.props.color} : undefined;
    let details = this.props.selected ? styles.details_selected : styles.details;

    return (
      <div className={rowStyle} ref="leader_row">

        <ContainerDimensions>
          { ({ height, width }) => this.renderRankAndSlug(height, width) }
        </ContainerDimensions>

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
