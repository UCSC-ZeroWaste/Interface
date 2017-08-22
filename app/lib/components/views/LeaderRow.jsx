import React, {Component} from 'react';
import styles from '../../../App.css';
import merge from 'lodash/merge';
import ContainerDimensions from 'react-container-dimensions';


export default class LeaderRow extends Component {
  constructor(props) {
    super(props);
    // this.state = {rowHeight: '10px', slugHeight: '10px'};
    // this.renderSlug = this.renderSlug.bind(this);
  }

  componentDidMount() {
    // console.log('BEFORE', this.state.rowHeight);
    // this.updateState();
    // console.log('AFTER', this.state.rowHeight);
  }

  componentDidUpdate() {
    // if (this.state.rowHeight !== this.refs.leader_row.clientHeight + 'px') {
    //   this.updateState();
    // }
  }

  renderSlug(height, width) {
    console.log('slug height', height, 'slug width', width);

    let slugContainer;
    if (this.props.selected) {
      slugContainer = {
        width: 1.2 * height,
        height: 1.2 * height,
        // position: 'relative'
      };
    } else {
      slugContainer = {
        width: height,
        height: height,
        // position: 'relative'
      };
    }

    if (this.props.selected) {
      return (
        <div style={slugContainer}>
          <div style={{backgroundColor: this.props.color}} className={styles.slug}>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.slug_container} style={slugContainer}>

        </div>
      );
    }
  }

  // updateState() {
  //   let rowHeight = this.refs.leader_row.clientHeight;
  //   console.log('state', rowHeight);
  //   let slugHeight = rowHeight * 1.2;
  //   this.setState({
  //     rowHeight: rowHeight + 'px',
  //     slugHeight: slugHeight + 'px'
  //   });
  //
  // }

  renderRank(height, width) {
    console.log('rank height', height, 'rank width', width);
    let rankContainer;
    if (this.props.selected) {
      rankContainer = {
        width: 1.2 * height,
        height: 1.2 * height,
        // position: 'relative'
      };
    } else {
      rankContainer = {
        width: height,
        height: height,
        // position: 'relative'
      };
    }
    let rankingStyle = this.props.selected ? styles.rank_selected : styles.rank;
    return (
      <div className={rankingStyle} style={{backgroundColor: this.props.color, width: height}}>
        <div>{ this.props.rank }<sup>{ this.renderRankDegree() }</sup></div>
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
    let rankingStyle = this.props.selected ? styles.rank_selected : styles.rank;
    // console.log("this.props: ", this.props);
    return (
      <div className={rowStyle} ref="leader_row">
        <ContainerDimensions>
          { ({ height, width }) => this.renderSlug(height, width) }
        </ContainerDimensions>

        <ContainerDimensions>
          { ({ height, width }) => this.renderRank(height, width) }
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

// <Rank width={width} height={height} color={this.props.color} style={rankingStyle} rank={this.props.rank}/>
