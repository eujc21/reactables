import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

class Dropdown extends React.Component {

  static propTypes = {
    node: PropTypes.node.isRequired,
    isDisabled: PropTypes.bool,
    menuDirection: PropTypes.string,
    children: PropTypes.arrayOf((propValue, key,) => {
      if (propValue[key].type !== DropdownOption)
        return new Error('One or more children are not of type DropdownItem')
    }),
    styles: PropTypes.object
  }


  static defaultProps = {
    animate: false,
    menuDirection: 'right',
    isDisabled: false
  }

  state = { isHighlighted: false, isMenuVisible: false }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onClickOutside, false);
  }

  onClickOutside = (e) => {
    if (this.main && this.main.contains(e.target)) {
      return
    }

    this.setState({
      isMenuVisible: false,
      isHighlighted: false
    })
  }

  toggleButtonHighlight = () =>{
    if(this.props.isDisabled)
      return

    this.setState({
      isHighlighted: this.state.isMenuVisible ===  true ? this.state.isHighlighted : !this.state.isHighlighted,
      isMenuVisible: this.state.isHighlighted === true ? this.state.isMenuVisible : false
    })
  }

  toggleMenu = () =>{
    if(this.props.isDisabled)
      return

    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    })
  }

  handleMenuClick = () =>{
    this.setState({
      isMenuVisible: false,
      isHighlighted: false
    })
  }

  setChildPosition =(index)=>{
    if(index === 0)
      return 'first'
    if(index === this.props.children.length - 1)
      return 'last'

    return 'middle'
  }

  render(){

    const { isDisabled, children, styles } = this.props

    let style = {
      base: {
        display: 'inline-block',
        position: 'relative',
      },
      node:{
        borderRadius: 3,
        transition: 'box-shadow 0.5s ease',
        boxShadow: this.state.isHighlighted ? '0px 2px 4px 0px rgba(0,0,0, 0.29)' : null,
        cursor: isDisabled ? null : 'pointer'

        // face:{
        //   transition: 'transform 0.5s ease-in-out',
        //   transform: this.state.isHighlighted && this.props.animate ? 'rotate(-90deg)' : null
        // }
      },
      menu:{
        position: 'absolute',
        visibility: this.state.isMenuVisible ? 'visible' : 'hidden',
        width: 'auto',
        minWidth: 200,
        right: this.props.menuDirection === 'left' ? 0 : null,
        left: this.props.menuDirection === 'right' ? 0 : null,
        marginTop: 3,
        backgroundColor: 'white',
        borderTop: '1px solid #dcdcdc',
        borderLeft: '1px solid #dcdcdc',
        borderRight: '1px solid #dcdcdc',
        borderRadius: 3,
        transition: '0.5s ease',
        opacity: this.state.isMenuVisible ? 1 : 0,
        zIndex: 10000
      }
    }

    merge(style, styles)

    return(
      <span ref={ main => this.main = main } style={ style.base }>
        <div
          style={ style.node }
          onMouseEnter={ this.toggleButtonHighlight }
          onMouseLeave={ this.toggleButtonHighlight }
          onClick={ this.toggleMenu }>

          <div style={ style.node }>
            { this.props.node }
          </div>

        </div>
        <div style={ style.menu } onClick={ this.handleMenuClick }>
          {
            React.Children.map(children, (child, i) => {
              return React.cloneElement(child, {
                position: this.setChildPosition(i)
              })
            })
          }
        </div>
      </span>
    )
  }
}

const DropdownOption =({ text, position, onClick, styles })=>{

  const onEnterMenuItem = (e) =>{
    e.target.style.backgroundColor = '#f9f9f9'
  }

  const onLeaveMenuItem = (e) =>{
    e.target.style.backgroundColor = 'white'
  }

  const handleClick =()=>{
    onClick()
  }

  const setBorderRadius =()=>{
    if(position === 'first')
      return '3px 3px 0 0'

    if(position === 'middle')
      return 0

    if(position === 'last')
      return '0 0 3px 3px'
  }

  const style = {
    padding: 10,
    fontSize: 16,
    cursor: 'pointer',
    transition: '0.2s all',
    borderRadius: setBorderRadius(),
    borderBottom: '1px solid #dcdcdc'
  }

  merge(style, styles)

  return (
    <div
       style={ style }
       onMouseEnter={ onEnterMenuItem }
       onMouseLeave={ onLeaveMenuItem }
       onClick={ handleClick }
    >
      { text }
    </div>
  )
}

DropdownOption.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]).isRequired,
  shouldHideMenu: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  styles: PropTypes.object
}

DropdownOption.defaultProps = {
  shouldHideMenu: true
}

export { Dropdown, DropdownOption }
