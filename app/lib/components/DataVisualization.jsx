import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ViewTemplate from './views/_ViewTemplate';
import LeaderBoard from './views/LeaderBoard.jsx';
import LineChart from './views/LineChart.jsx';
import HeatMap from './views/HeatMap.jsx';
import SizeView from './views/SizeView.jsx';
import Table from './views/Table.jsx';
import Slider from 'react-slick';
import {handleViewSelect} from '../actions/view_actions';
import styles from '../../App.css';
import { CSSTransitionGroup } from 'react-transition-group';
import { MoonLoader } from 'halogen';
import Tip from './views/tips/Tip';
import {AUTOPLAY} from '../constants/settings';
// import Tip1 from './views/tips/Tip1';
// import Tip2 from './views/tips/Tip2';
// import Tip3 from './views/tips/Tip3';
// import Tip4 from './views/tips/Tip4';

import transitions from './test_carousel/transitions.css';
import sliding from './test_carousel/sliding.css';
import merge from 'lodash/merge';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class DataVisualization extends Component {
  constructor(props) {
    super(props);
    // this.handleSliderChange = this.handleSliderChange.bind(this);
    // this.keyHandler = this.keyHandler.bind(this);

    this.views = [
      <LeaderBoard/>,
      <LineChart type={'green'}/>,
      <LineChart type={'general'}/>,
      <HeatMap/>,
      <Tip/>,
      <Table/>
    ];
    // this.tips = [
    //   <Tip1 title={'tip1'}/>,
    //   <Tip2 title={'tip2'}/>,
    //   <Tip3 title={'tip3'}/>,
    //   <Tip4 title={'tip4'}/>,
    // ];
    this.slides = this.views;
    // .concat(this.tips);
    this.state = {
      autoplay: true
    };
  }

  renderSlides() {
    if (this.props.errors) {
      return this.slides.map( (component, index) => {
        return (
          <div className={styles.slide} key={index} style={{boxSizing: 'borderBox', border: '5px solid white', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
            DATA COULD NOT BE FETCHED <br/>
            {this.props.errors}
          </div>
        );
      });
    } else if (!this.props.records) {
      return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <MoonLoader
            color={'white'}
            size={'100px'}
            margin={'5px'}
            loading={true}
            />
        </div>);
    } else if (this.props.records) {
      return this.slides.map( (component, index) => {
        return (
          <div className={styles.slide} key={index} >
            {component}
          </div>
        );
      });
    }
  }

  slideChangeSettings() {
    // return {};
    return {afterChange: (nextSlide) => this.props.handleViewSelect(nextSlide)};
    // return {beforeChange: (prevSlide, nextSlide) => this.props.handleViewSelect(nextSlide)};
  }

  componentDidMount() {
    this.autoplayFix(AUTOPLAY.restartInterval);
  }

  //Fix: autoplay won't start until at least one slide has been moved
  autoplayFix(timeout) {
    setTimeout( () => this.refs.slider.slickNext(), timeout);
  }

  componentWillReceiveProps(nextProps) {
    this.refs.slider.slickGoTo(nextProps.currentView);
    if (nextProps.autoplay && nextProps.autoplay !== this.props.autoplay) this.autoplayFix(0);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate(nextProps, nextState)', nextProps, nextState);
  //   if(this.props.autoplay === nextProps.autoplay) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    var settings = merge({
      accessibility: true, //scrolling via tabs/arrows
      adaptiveHeight: true,
      arrows: false,
      autoplay: this.props.autoplay,
      autoplaySpeed: AUTOPLAY.nextSlideInterval,
      speed: AUTOPLAY.slideSpeed,
      cssEase: 'ease-out', // also 'ease' and 'ease-in' and 'ease-in-out'
      dots: false,
      draggable: true,
      fade: false,
      focusOnSelect: false,
      infinite: true,
      lazyLoad: false,
      pauseOnHover: false,
      slidesToShow: 1,
      swipeToSlide: true,
      // touchThreshold: 5,
      useCSS: true,
      variableWidth: false,

      // centerMode: true,
      // slidesToScroll: 1,
    }, this.slideChangeSettings());


    const components = this.slides.map((slide, i) => (
       <div key={slide} >
         {slide}
       </div>
     ));

    return (
      <div
        className={styles.main_view}
        tabIndex="0"
        >
        <Slider ref='slider' {...settings} className={styles.slider}>
          {this.renderSlides()}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentView: state.currentView.view,
  autoplay: state.touch.autoplay,
  records: state.records.data,
  errors: state.records.errors
});

const mapDispatchToProps = (dispatch) => ({
  handleViewSelect: (navButtonNum) => dispatch(handleViewSelect(navButtonNum))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataVisualization);
