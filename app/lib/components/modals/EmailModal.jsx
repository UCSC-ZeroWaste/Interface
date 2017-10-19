import React, {Component} from 'react';
import {connect} from 'react-redux';
import request from 'superagent';
import Keyboard from '../keyboard/Keyboard';
import KeyboardButton from '../keyboard/KeyboardButton';
import LatinLayout from '../keyboard/layouts/LatinLayout';
import jsonp from 'jsonp';
import styles from '../../../App.scss';

class EmailModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      msg: '',
      mounted: false,
      status: '',
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
        status: "error",
        msg: "Not a valid email. Please try again."
      });
      return;
    }

    let listId = '58a2a694d1';
    let u = '76d746e403a6787587fe63836';
    let url =  `//ucsc.us16.list-manage.com/subscribe/post-json?u=${u}&amp;id=${listId}&EMAIL=${email}`;

    const responseCallback = (err, data) => {
      if (err) {
        // console.log('error', err);
        this.setState({
          status: 'error',
          msg: err
        });
      } else if (data.result !== 'success') {
        // console.log('result', data.result);
        this.setState({
          status: 'error',
          msg: data.msg
        });
      } else {
        // console.log('data', data);
        this.refs.email_input.value = '';
        this.setState({
          email: '',
          status: 'success',
          msg: 'Success!! Almost finished... To complete the subscription process, please click the link in the email we just sent you.'
        });
      }
    };

    this.setState(
      { status: "sending", msg: null },
      () => jsonp(url, { param: "c" }, responseCallback)
    );
  }

  renderSubmissionMessage() {
    let status = (this.state.status === 'success' ? styles.success : styles.error);
    if (this.state.msg === '') {
      return <div hidden></div>;
    } else {
      return (
        <div className={`${styles.email_submit_message} ${status}`}>
          {this.state.msg}
        </div>
      );
    }
  }

  handleInput(e) {
    this.setState({
      email: e.target.value,
      status: '',
      msg: '',
    });
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
    let status = (this.state.status === 'error' ? styles.error : '');

    return (
      <div className={`${styles.signup_container} ${touchscreen}`}>
        <form name="mc-embedded-subscribe-form" className={styles.signup_form} noValidate>
          <div className={styles.title}></div>
          <p className={styles.signup_header1}>Join us to help make UCSC a zero waste campus!</p>
          <p className={styles.signup_header2}>Add your email and we'll send you 90 days <br /> of (genuinely) awesome zero waste living tips.</p>
          <input
            type="text"
            autoFocus
            autoComplete={'off'}
            ref="email_input"
            onChange={this.handleInput}
            onFocus={this.handleFocus}
            name="EMAIL"
            className={`${styles.email_input} ${status}`}
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
                id="InfoButton_SubmitEmail"
                className={styles.email_submit_button}
                />
              }
            </div>
          {this.renderSubmissionMessage()}
        </form>
        {this.renderKeyboard()}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  device: state.currentView.device,
  // modalTimeout: state.touch.modalTimeout
});

// const mapDispatchToProps = (dispatch) => ({
//   toggleModal: (type) => dispatch(toggleModal(type)),
// });

export default connect(mapStateToProps)(EmailModal);
// export default connect(mapStateToProps, mapDispatchToProps)(EmailModal);
