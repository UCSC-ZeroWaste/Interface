import React, {Component} from 'react';
import NavButton from './nav_button';

export default class NavBar extends Component {
  constructor(){
    super();

  }

  render (){
    return (
      <div style={{width: '100%', height: '100', border: 'solid 1px black', display: 'flex'}}>
        <NavButton title={'button1'} view={1}/>
        <NavButton title={'button2'} view={2}/>
        <NavButton title={'button3'} view={3}/>
        <NavButton title={'button4'} view={4}/>
        <NavButton title={'button5'} view={5}/>
      </div>
    );
  }
}
