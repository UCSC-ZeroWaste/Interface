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
          If you'd like to get more involved enter your email below:
        </div>
        <input
          type="email"
          value={this.state.email}
          ref='email_input'
          onChange={this.handleInput}
          name="EMAIL"
          className="email"
          id="mce-EMAIL"
          placeholder="email address"
          required
          />

        {this.renderKeyboard()}

      </div>
    );
  }
}

// <div id="mc_embed_signup">
//   <form id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" noValidate>
//     <div id="mc_embed_signup_scroll">
//       <label htmlFor="mce-EMAIL">Subscribe to our mailing list</label>
//       <input
//         type="email"
//         value={this.state.email}
//         ref='email_input'
//         onChange={this.handleInput}
//         name="EMAIL"
//         className="email"
//         id="mce-EMAIL"
//         placeholder="email address"
//         required
//         />
//       <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
//         <input type="text" name="b_169807c453e90727dcebdcb04_ecc956188b" tabIndex="-1" value=""/>
//       </div>
//       <div className="clear">
//         <input
//           type="submit"
//           onClick={this.handleSubmit}
//           value="Subscribe"
//           name="subscribe"
//           id="mc-embedded-subscribe"
//           className="button"
//           />
//       </div>
//     </div>
//   </form>
// </div>


// "//ucsc.us16.list-manage.com/subscribe/post?u=76d746e403a6787587fe63836&amp;id=58a2a694d1"
