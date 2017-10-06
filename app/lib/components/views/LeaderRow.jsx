import React, {Component} from 'react';
import styles from '../../../App.scss';
import merge from 'lodash/merge';
import ContainerDimensions from 'react-container-dimensions';
import {SLUG_IMAGES} from '../../constants/constants';
import {connect} from 'react-redux';

class LeaderRow extends Component {
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

    if (this.props.selected && this.props.scope === 'local') {
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
    let touchscreen = this.props.device === 'touchscreen' ? styles.touchscreen : "";

    if (this.props.selected && this.props.scope === 'local') {
      var rankContainer = {
        width: 1.0 * height,
        height: 1.0 * height,
        position: 'relative'
      };
      var rankCircleStyle = styles.rank_circle_selected;
      var selected = styles.selected;
    } else {
      rankContainer = {
        width: height,
        height: height,
        position: 'relative'
      };
      rankCircleStyle = styles.rank_circle;
      selected = '';
    }
    return (
      <div style={rankContainer}>
        <div className={styles.opacityFixContainer}>
          <div style={{backgroundColor: this.props.color}} className={rankCircleStyle}></div>
        </div>
        <div className={styles.opacityFixContainer}>
          <div className={`${styles.rank_text} ${touchscreen} ${selected}`}>{ this.props.rank }<sup>{ this.renderRankDegree() }</sup></div>
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
    let selected = (this.props.selected && this.props.scope === 'local') ? styles.selected : '';
    let backgroundColor = (selected ? {backgroundColor: this.props.color} : undefined);

    return (
      <div className={`${styles.leader_row} ${selected}`} ref="leader_row">

        <ContainerDimensions>
          { ({ height, width }) => this.renderRankAndSlug(height, width) }
        </ContainerDimensions>

        <div className={styles.details_container}>
          <div className={`${styles.details} ${selected}`} style={backgroundColor}>
            <div className={`${styles.details_site} ${selected}`} >{this.props.site.site}</div>
            <div className={`${styles.details_ratio} ${selected}`} >{Math.round(this.props.site.diversionRatio)}%</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scope: state.currentView.scope,
  device: state.currentView.device
});

export default connect(mapStateToProps)(LeaderRow);
