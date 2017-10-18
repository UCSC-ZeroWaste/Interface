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
      mounted: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleSubmit(e) {
    let email = this.refs.email_input.value;
    if (this.props.device === 'desktop') e.preventDefault();
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
    // console.log('ref', this.refs.email_input.dataset);
    this.setState({mounted: true});
  }

  renderKeyboard() {
    if (this.state.mounted && this.props.device === 'touchscreen') {
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
    // TODO maybe make some sort of animation?
  }

  render (){
    let touchscreen = this.props.device === 'touchscreen' ? styles.touchscreen : "";

    return (
      <div className={`${styles.signup_container} ${touchscreen}`}>
        <form name="mc-embedded-subscribe-form" className="validate" noValidate>
          <div>
            <div className={styles.title}>
            <label htmlFor="mce-EMAIL">TAKE ACTION</label><br />
            </div>
          <label htmlFor="mce-EMAIL">Join us to help make UCSC a zero waste campus!</label><br />
            <label htmlFor="mce-EMAIL">Add your email and we'll send you 90 days of (genuinely) awesome zero waste living tips.</label><br /><br />
            <input
              type="text"
              autoFocus
              autoComplete={'off'}
              ref="email_input"
              onChange={this.handleInput}
              onFocus={this.handleFocus}
              name="EMAIL"
              className={styles.email_input}
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
                  id="SubmitEmail_InfoButton"
                  className={styles.email_submit_button}
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
