import React, { PropTypes } from 'react'

export class SelectOption extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired
  }

  constructor(props){
    super(props)
  }

  render(){
    return(null)
  }
}
