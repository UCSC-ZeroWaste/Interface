import React, {Component} from 'react';
import {connect} from 'react-redux';
import request from 'superagent';
import Keyboard, {KeyboardButton, LatinLayout} from 'react-screen-keyboard';

const MyComponent = ({inputNode, submit}) => (
  <Keyboard
    inputNode={inputNode}
    layouts={[LatinLayout]}
    />
);
// leftButtons={[
//   <KeyboardButton
//     onClick={submit}
//     value="Back"
//     />
// ]}
// rightButtons={[
//   <KeyboardButton
//     onClick={submit}
//     value="Submit"
//     classes="keyboard-submit-button"
//     />
// ]}


export default class EmailModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: 'nycdelisauce@gmail.com'
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // "//ucsc.us16.list-manage.com/subscribe/post?u=76d746e403a6787587fe63836&amp;id=58a2a694d1"
    request
      .post("//ucsc.us16.list-manage.com/subscribe/post?u=76d746e403a6787587fe63836&amp;id=58a2a694d1" )
      .set({'content-type': 'application/json'})
      .send({ email_address: this.state.email}) // sends a JSON post body
      .end((err, res) => {
        console.log('err', err, 'res', res);
        // Calling the end function will send the request
      });
    // request
    //   .post("ucsc.us16.list-manage.com/subscribe/")
    //   .send({ email: this.state.email, u: '76d746e403a6787587fe63836', id: '58a2a694d1'}) // sends a JSON post body
    //   .end((err, res) => {
    //     console.log('err', err, 'res', res);
    //     // Calling the end function will send the request
    //   });
  }

  handleInput(e) {
    this.setState({email: e.target.value});
  }

  renderKeyboard() {
    return (
      <Keyboard
        inputNode={this.refs.email_input}
        submit={this.handleSubmit}
        layouts={[LatinLayout]}
        />
    );
  }


  render (){
    return (
      <div>
        <div>
          The information shown on this interactive screen presents the amount of waste that is picked up on the University of Santa Cruz’s campus. The amount of waste is calculated using mechanical scales that are fitted to the arm of each garbage truck and weigh each load.  We believe that by presenting the campus’s waste data in a way that is public, color graded, and ranks colleges by their waste score, will help encourage students to adopt better zero waste behaviors and achieve the universities goal of becoming a complete zero waste campus.

Click the TAKE ACTION button in the top right of the screen to sign up for more tips on how you can live without creating any garbage at all.
        </div>
      </div>
    );
  }
}
