import React, {Component} from 'react';

export default class ViewTemplate extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
        {this.props.title}
      </div>

    )
  }
}
