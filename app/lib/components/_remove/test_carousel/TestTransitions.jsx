import React from 'react';
import styles from '../../../App.css';
import { CSSTransitionGroup } from 'react-transition-group';
import transitions from './transitions.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['hello', 'world', 'click', 'me'],
      images: ["http://www.fillmurray.com/400/400", "http://www.fillmurray.com/410/410",
                 "http://www.fillmurray.com/420/420"],
        image: "http://www.fillmurray.com/400/400"
      };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(index) {
      this.setState({image: this.state.images[index]});
   }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }


    render() {

      var items = this.state.items.map(function(item, i) {
          return (
            <div key={item} onClick={this.handleRemove.bind(this, i)}>
              {item}
            </div>
          );
        }.bind(this));

          return (
            <div>
              <button onClick={this.handleAdd}>Add Item</button>
              <CSSTransitionGroup
                transitionAppear
                transitionName={transitions}
                transitionEnterTimeout={4000}
                transitionLeaveTimeout={500}
                transitionAppearTimeout={3000} >
                {items}
              </CSSTransitionGroup>

            </div>
          );
       }
}
// <div className={styles.gallery}>
//   <button onClick={this.handleAdd}>Add Item</button>
//
//   <ReactCSSTransitionGroup
//     transitionName={transitions}
//     transitionEnterTimeout={1500}
//     transitionLeaveTimeout={300}>
//     >
//     {items}
//   </ReactCSSTransitionGroup>
// </div>


// <div className="gallery">
//   <button onClick = {() => this.handleClick(0)}>One</button>
//   <button onClick = {() => this.handleClick(1)}>Two</button>
//   <button onClick = {() => this.handleClick(2)}>Three</button><br/>
//
//
//   <ReactCSSTransitionGroup
//     transitionName = {"carousel"}
//     transitionEnterTimeout = {2900}
//     transitionLeaveTimeout = {2900}>
//     <img src={this.state.image} key={this.state.image} />
//   </ReactCSSTransitionGroup>
// </div>


// import React from 'react';
// import { CSSTransitionGroup } from 'react-transition-group';
// var socials = ['https://raw.githubusercontent.com/isaacs/npm/master/html/npm-256-square.png', 'https://wasin.io/wp-content/uploads/2015/05/showimage.png'];
//
// export default class TestTransitions extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {iconsAreVisible: false};
//   }
//
//   hideIcons() {
//     this.setState({
//         iconsAreVisible: false
//     });
//   }
//
//   showIcons() {
//     this.setState({
//         iconsAreVisible: true
//     });
//   }
//
//   render () {
//     return (
//       <section className="SocialBlock" onMouseOver={this.showIcons} onMouseLeave={this.hideIcons}>
//         <div className="socialAccounts">
//           <CSSTransitionGroup
//             transitionName="socialIcons"
//             transitionEnterTimeout={1000}
//             transitionLeaveTimeout={1000}
//             transitionAppear={true}
//             transitionAppearTimeout={300}>
//               {this.state.iconsAreVisible &&
//                 <div key="456">
//                   {socials.map((icon, index) => {
//                     return <span className={'icon icon-'+index}
//                                 key={index}>
//                                 <img src={icon} height="100"/>
//                           </span>
//                   })}
//                 </div>
//               }
//               {!this.state.iconsAreVisible &&
//                 <div key="123">
//                 <h3>Check out the social stuff!</h3>
//                 </div>
//               }
//           </CSSTransitionGroup>
//         </div>
//      </section>
//     );
//   }
// }
