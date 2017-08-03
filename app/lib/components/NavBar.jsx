import React, {Component} from 'react';
import NavButton from './navbar/NavButton';
import SiteSelector from './navbar/SiteSelector';

export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div style={{width: '100%', height: '100', border: 'solid 1px black', display: 'flex', justifyContent: 'space-between'}}>
        <SiteSelector/>
        <NavButton title={'LeaderBoard'} view={'LeaderBoard'}/>
        <NavButton title={'LineChart'} view={'LineChart'}/>
        <NavButton title={'SizeView'} view={'SizeView'}/>
        <NavButton title={'button4'} view={4}/>
        <NavButton title={'button5'} view={5}/>
      </div>
    );
  }
}
