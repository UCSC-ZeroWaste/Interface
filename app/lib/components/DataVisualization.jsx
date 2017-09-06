import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ViewTemplate from './views/_ViewTemplate';
import LeaderBoard from './views/LeaderBoard.jsx';
import LineChart from './views/LineChart.jsx';
import HeatMap from './views/HeatMap.jsx';
import SizeView from './views/SizeView.jsx';
import Slider from 'react-slick';
import {handleViewSelect} from '../actions/view_actions';
import styles from '../../App.css';
import { CSSTransitionGroup } from 'react-transition-group';
import { MoonLoader } from 'halogen';
import Tip1 from './views/tips/Tip1';
import Tip2 from './views/tips/Tip2';
import Tip3 from './views/tips/Tip3';

import transitions from './test_carousel/transitions.css';
import sliding from './test_carousel/sliding.css';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class DataVisualization extends Component {
  constructor(props) {
    super(props);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.keyHandler = this.keyHandler.bind(this);

    this.views = [
      <LeaderBoard/>,
      <LineChart type={'green'}/>,
      <LineChart type={'general'}/>,
      <HeatMap/>,
    ];
    this.tips = [
      <Tip1 title={'tip1'}/>,
      <Tip2 title={'tip2'}/>,
      <Tip3 title={'tip3'}/>,
    ];
    this.slides = this.views.concat(this.tips);
  }
  // <SizeView />,
  // <_ViewTemplate title={'Empty View 6'}/>,
  // <_ViewTemplate title={'Empty View 7'}/>

  handleSliderChange(prevSlide, nextSlide) {
    console.log('handleSliderChange', prevSlide, nextSlide);
    if (nextSlide > this.views.length) {
      nextSlide = this.views.length;
    }
    this.props.handleViewSelect(nextSlide);
  }

  // TODO need to see if there is a more efficient lifecycle method
  componentWillReceiveProps(nextProps) {
    //TODO need a check to see if nextProps were due to clicked nav button vs view change
    this.refs.slider.slickGoTo(nextProps.currentView);
    // console.log('nextProps', nextProps);
  }

  renderView() {
    if (this.props.errors) {
      return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
          DATA COULD NOT BE FETCHED <br/>
          {this.props.errors}
        </div>);
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
      return this.slides[this.props.currentView];
    }
  }

  renderSlides() {
    if (this.props.errors) {
      return this.slides.map( (component, index) => {
        if (index > 0) {return (
          <div className={styles.slide} key={index} style={{boxSizing: 'borderBox', border: '5px solid white', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
            DATA COULD NOT BE FETCHED <br/>
            {this.props.errors}
          </div>
        );} else {
          return (
            <div className={styles.slide} key={index} >
              {component}
            </div>
          );
        }
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

  // TODO allows for cycling through nav views -- this is just here for easier testing on the web
  keyHandler(e) {
    const view = this.props.currentView;
    const max = this.slides.length - 1;
    if (e.key === 'ArrowRight') {
      var nextView = ( view >= max ? 0 : view + 1);
      this.props.handleViewSelect(nextView);
    } else if (e.key === 'ArrowLeft') {
      nextView = ( view === 0 ? max : view - 1);
      this.props.handleViewSelect(nextView);
    }
  }

  renderTest() {

  }

  render() {
    var settings = {
      adaptiveHeight: true,
      // afterChange: this.handleSliderChange,
      beforeChange: this.handleSliderChange,
      arrows: true,
      autoplay: false,
      autoplaySpeed: 3000,
      dots: false,
      // centerMode: true,
      fade: false,
      infinite: true,
      lazyLoad: false,
      pauseOnHover: true,
      slidesToShow: 1,
      // slidesToScroll: 1,
      speed: 1000,
      swipeToSlide: true,
      variableWidth: false,
    };
    // style={{height:"100%",width:"100%"}}
    const components = this.slides.map((slide, i) => (
       <div key={slide} >
         {slide}
       </div>
     ));

    return (
      <div
        className={styles.main_view}
        onKeyDown={this.keyHandler}
        tabIndex="0"
        >
        <Slider ref='slider' {...settings} className={styles.slider}>
          {this.renderSlides()}
        </Slider>
      </div>
    );
  }
}
// {this.renderView()}

// <CSSTransitionGroup
//   transitionAppear
//   transitionName={sliding}
//   transitionEnterTimeout={4000}
//   transitionLeaveTimeout={4000}
//   transitionAppearTimeout={500} >
//   {components[this.props.currentView]}
// </CSSTransitionGroup>

// {(this.props.currentView) % 2 === 1 ? <div> hi </div> : <div> bye </div>}
// {this.renderView()}


const mapStateToProps = (state, ownProps) => ({
  currentView: state.currentView.view,
  records: state.records.data,
  errors: state.records.errors
  // autoplay: state.autoplay
});

const mapDispatchToProps = (dispatch) => ({
  handleViewSelect: (navButtonNum) => dispatch(handleViewSelect(navButtonNum))
});

// export default DataVisual;
export default connect(mapStateToProps, mapDispatchToProps)(DataVisualization);
