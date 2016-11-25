import React, { PropTypes } from 'react'

export class DropdownItem extends React.Component {
  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    shouldHideMenu: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    styles: PropTypes.object,
  }

  static defaultProps = {
    shouldHideMenu: true
  }

  constructor(props){
    super(props)
  }

  render(){
    return(null)
  }

}