import React, { PropTypes } from 'react'

export class DropdownItem extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    styles: PropTypes.object,
  }

  constructor(props){
    super(props)
  }

  render(){
    return(null)
  }

}