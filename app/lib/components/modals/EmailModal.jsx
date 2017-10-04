import React, {Component} from 'react';
import {connect} from 'react-redux';
import request from 'superagent';
import Keyboard from '../keyboard/Keyboard';
import KeyboardButton from '../keyboard/KeyboardButton';
import LatinLayout from '../keyboard/layouts/LatinLayout';
import jsonp from 'jsonp';
import styles from '../../../App.scss';

// const MyComponent = ({inputNode, submit}) => (
//   <Keyboard
//     inputNode={inputNode}
//     layouts={[LatinLayout]}
//     />
// );
// rightButtons={[
//   <KeyboardButton
//     onClick={submit}
//     value="Submit"
//     classes="keyboard-submit-button"
//     />
// ]}


class EmailModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      msg: '',
      focused: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleSubmit(e) {
    let email = this.refs.email_input.value;
    if (this.props.device === 'home') e.preventDefault();
    if (!email || email.length < 5 || email.indexOf("@") === -1) {
      this.setState({
        status: "error"
      });
      return;
    }

    let listId = '58a2a694d1';
    let u = '76d746e403a6787587fe63836';
    let url =  `//ucsc.us16.list-manage.com/subscribe/post-json?u=${u}&amp;id=${listId}&EMAIL=${email}`;

    const responseCallback = (err, data) => {
      if (err) {
        console.log('error', err);
        this.setState({
          status: 'error',
          msg: err
        });
      } else if (data.result !== 'success') {
        console.log('result', data.result);
        this.setState({
          status: 'error',
          msg: data.msg
        });
      } else {
        console.log('data', data);
        this.setState({
          status: 'success',
          msg: data.msg
        });
      }
    };

    this.setState(
      {
        status: "sending",
        msg: null
      },

      () => jsonp(url, {
        param: "c"
      }, responseCallback)
    );
  }

  handleInput(e) {
    this.setState({email: e.target.value});
  }

  componentDidMount() {
    console.log('ref', this.refs.email_input.dataset);

  }

  renderKeyboard() {
    if (this.state.focused && this.props.device === 'touchscreen') {
      return (
        <Keyboard
          inputNode={this.refs.email_input}
          layouts={[LatinLayout]}
          leftButtons={[

          ]}
          rightButtons={[
              <KeyboardButton
                onClick={this.handleSubmit}
                value="Submit"
                classes="keyboard-submit-button"
              />
            ]}
          />
      );
    } else {return;}
  }
  handleFocus() {
    this.setState({focused: true});
  }

  render (){
    return (
      <div className={styles.signup_container}>
        <form id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" noValidate>
          <div id="mc_embed_signup_scroll">
            <label htmlFor="mce-EMAIL">Subscribe to our mailing list</label>
            <input
              type="text"

              ref="email_input"
              onChange={this.handleInput}
              onFocus={this.handleFocus}
              name="EMAIL"
              className="email"
              id="mce-EMAIL"
              placeholder="email address"
              required
              />
            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
              <input type="text" name="b_169807c453e90727dcebdcb04_ecc956188b" tabIndex="-1" value=""/>
            </div>
            <div className="clear">
              {this.props.device === 'touchscreen' ? '' :
                <input
                  type="submit"
                  onClick={this.handleSubmit}
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                  />
              }
            </div>
            <div>{this.state.msg}</div>
          </div>
        </form>
        {this.renderKeyboard()}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  device: state.currentView.device,
});

export default connect(mapStateToProps)(EmailModal);
