import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ViewTemplate from './views/_ViewTemplate';
import LeaderBoard from './views/LeaderBoard.jsx';
import LineChart from './views/LineChart.jsx';
import SizeView from './views/SizeView.jsx';
import Slider from 'react-slick';
import {handleNavSelect} from '../actions/views';
import styles from '../../App.css';


class DataVisualization extends Component {
  constructor(props) {
    super(props);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(prevSlide, nextSlide) {
    this.props.handleNavSelect(nextSlide);
  }
  //
  // // TODO need to see if there is a more efficient lifecycle method
  componentWillReceiveProps(nextProps) {
    //TODO need a check to see if nextProps were due to clicked nav button vs view change
    this.refs.slider.slickGoTo(nextProps.currentView);
    // console.log('nextProps', nextProps);
  }

  renderSlides() {
    const components = [
      <LeaderBoard/>,
      <LineChart type={'green'}/>,
      <LineChart type={'general'}/>,
      <SizeView />,
      <_ViewTemplate title={'Empty View 4'}/>,
      <_ViewTemplate title={'Empty View 5'}/>,
      <_ViewTemplate title={'Empty View 6'}/>,
      <_ViewTemplate title={'Empty View 7'}/>
    ];

    return components.map( (component, index) => {
      return (
        <div className={styles.slide} key={index} >
          {component}
        </div>
      );
    });
  }

  render() {
    var settings = {
      adaptiveHeight: false,
      // afterChange: this.handleSliderChange,
      beforeChange: this.handleSliderChange,
      arrows: true,
      autoplay: false,
      autoplaySpeed: 3000,
      dots: true,
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
    return (
      <div className={styles.main_view}>
        <Slider ref='slider' {...settings} className={styles.slider}>
          {this.renderSlides()}
        </Slider>
      </div>
    );
  }
}
// <LineChart type={'green'}/>
// <LeaderBoard/>,

const mapStateToProps = (state, ownProps) => ({
  currentView: state.currentView,
  // autoplay: state.autoplay
});

const mapDispatchToProps = (dispatch) => ({
  handleNavSelect: (navButtonNum) => dispatch(handleNavSelect(navButtonNum))
});

// export default DataVisual;
export default connect(mapStateToProps, mapDispatchToProps)(DataVisualization);
