import React, {Component} from 'react';
import NavButton from './nav_button';
import SiteSelector from './site_selector';

export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div style={{width: '100%', height: '100', border: 'solid 1px black', display: 'flex', justifyContent: 'space-between'}}>
        <SiteSelector/>
        <NavButton title={'button1'} view={1}/>
        <NavButton title={'button2'} view={2}/>
        <NavButton title={'LeaderBoard'} view={3}/>
        <NavButton title={'LineChart'} view={4}/>
        <NavButton title={'button5'} view={5}/>
      </div>
    );
  }
}
