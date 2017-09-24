import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ViewTemplate from './views/_ViewTemplate';
import LeaderBoard from './views/LeaderBoard.jsx';
import LineChart from './views/LineChart.jsx';
import SizeView from './views/SizeView.jsx';
// import Slider from 'react-slick';
import {handleViewSelect} from '../actions/view_actions';
import styles from '../../App.css';
import { CSSTransitionGroup } from 'react-transition-group';
import { MoonLoader } from 'halogen';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import transitions from './test_carousel/transitions.scss';
import sliding from './test_carousel/sliding.scss';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class DataVisualizationPRC extends Component {
  constructor(props) {
    super(props);
    // this.handleSliderChange = this.handleSliderChange.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
    this.components = [
      <LeaderBoard/>,
      <LineChart type={'green'}/>,
      <LineChart type={'general'}/>,
      <SizeView />,
      <_ViewTemplate title={'Empty View 5'}/>,
      <_ViewTemplate title={'Empty View 6'}/>,
      <_ViewTemplate title={'Empty View 7'}/>
    ];
  }

  // handleSliderChange(prevSlide, nextSlide) {
  //   this.props.handleViewSelect(nextSlide);
  // }
  //
  // // TODO need to see if there is a more efficient lifecycle method
  // componentWillReceiveProps(nextProps) {
  //   //TODO need a check to see if nextProps were due to clicked nav button vs view change
  //   this.refs.slider.slickGoTo(nextProps.currentView);
  //   // console.log('nextProps', nextProps);
  // }

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
      return (
        <CarouselProvider
          naturalSlideWidth={400}
          naturalSlideHeight={800}
          totalSlides={3}
          orientation={'horizontal'}
          visibleSlides={1}
          >
          {this.renderSlides()}
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
      );
    }
  }

  renderSlides() {
    return this.components.map( (component, index) => {
      return (
        // <div className={styles.slide} key={index} >
          <Slide index={index} key={index}>
            Hi
          </Slide>
        // </div>
      );
    });
  }

  // TODO allows for cycling through nav views -- this is just here for easier testing on the web
  keyHandler(e) {
    const view = this.props.currentView;
    const max = this.components.length - 1;
    if (e.key === 'ArrowRight') {
      var nextView = ( view >= max ? 0 : view + 1);
      this.props.handleViewSelect(nextView);
    } else if (e.key === 'ArrowLeft') {
      nextView = ( view === 0 ? max : view - 1);
      this.props.handleViewSelect(nextView);
    }
  }

  render() {
    // style={{height:"100%",width:"100%"}}
    const components = this.components.map((component, i) => (
       <div key={component} >
         {component}
       </div>
     ));

    return (
      <div
        className={styles.main_view}
        onKeyDown={this.keyHandler}
        tabIndex="0"
        >
        <CarouselProvider
         naturalSlideWidth={100}
         naturalSlideHeight={125}
         totalSlides={3}
       >
         <Slider>
           <Slide index={0}>I am the first Slide.</Slide>
           <Slide index={1}>I am the second Slide.</Slide>
           <Slide index={2}>I am the third Slide.</Slide>
         </Slider>
         <ButtonBack>Back</ButtonBack>
         <ButtonNext>Next</ButtonNext>
       </CarouselProvider>
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
export default connect(mapStateToProps, mapDispatchToProps)(DataVisualizationPRC);
