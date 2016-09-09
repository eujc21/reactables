import React, { PropTypes } from 'react'
import { DropdownItem } from './dropdown_item'

// ** usage **
//
//  <Dropdown
//    face={
//      <div>
//        <i className="icon-name"/>
//      </div>
//  }>
//    <DropdownItem text="Item 1" onClick={ ()=>console.log('test') }/>
//  </Dropdown>


export class Dropdown extends React.Component {

  static propTypes = {
    face: PropTypes.node.isRequired,
    menuDirection: PropTypes.string,
    children: PropTypes.arrayOf((propValue, key,) => {
      if (propValue[key].type !== DropdownItem)
        return new Error('One or more children are not of type DropdownItem')
    })
  }


  static defaultProps = {
    animate: false,
    menuDirection: 'left'
  }

  state = {isHighlighted: false, isMenuVisible: false}

  constructor(props){
    super(props)
  }

  componentDidMount(){
    document.addEventListener('click', this.onClickOutside, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.onClickOutside, false);
  }

  onClickOutside = (e) => {
    if (this.refs.main && this.refs.main.contains(e.target)) {
      return
    }

    this.setState({
      isMenuVisible: false,
      isHighlighted: false
    })
  }


  toggleButtonHighlight = () =>{
    this.setState({
      isHighlighted: this.state.isMenuVisible ===  true ? this.state.isHighlighted : !this.state.isHighlighted,
      isMenuVisible: this.state.isHighlighted === true ? this.state.isMenuVisible : false
    })
  }

  toggleMenu = () =>{
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

  onEnterMenuItem = (e) =>{
    e.target.style.backgroundColor = '#f9f9f9'
  }
  onLeaveMenuItem = (e) =>{
    e.target.style.backgroundColor = 'white'
  }

  render(){

    let style = {
      base: {
        position: 'relative'
      },
      button:{
        base:{
          borderRadius: 3,
          transition: 'box-shadow 0.5s ease',
          boxShadow: this.state.isHighlighted ? '0px 2px 4px 0px rgba(0,0,0, 0.29)' : null,
          cursor: 'pointer'
        },
        face:{
          transition: 'transform 0.5s ease-in-out',
          transform: this.state.isHighlighted && this.props.animate ? 'rotate(-90deg)' : null
        }
      },
      menu:{
        base: {
          position: 'absolute',
          visibility: this.state.isMenuVisible ? 'visible' : 'hidden',
          width: 'auto',
          minWidth: 200,
          right: this.props.menuDirection === 'left' ? 0 : null,
          left: this.props.menuDirection === 'right' ? 0 : null,
          marginTop: 3,
          backgroundColor: 'white',
          border: '1px solid #dcdcdc',
          borderRadius: 3,
          //transition: '0.5s ease',
          opacity: this.state.isMenuVisible ? 1 : 0,
          zIndex: 10000
        },
        item: {
          base:{
            padding: 10,
            fontSize: 16,
            cursor: 'pointer',
            transition: '0.2s all'
          },
          secondary: {
            borderTop: '1px solid #dcdcdc'
          }
        }
      }
    }
    return(
      <div ref='main' style={ style.base }>
        <div
          style={ style.button.base }
          onMouseEnter={ this.toggleButtonHighlight }
          onMouseLeave={ this.toggleButtonHighlight }
          onClick={ this.toggleMenu }>

          <div style={ style.button.face }>
            { this.props.face }
          </div>

        </div>
        <div style={ style.menu.base } onClick={ this.handleMenuClick }>
          { this.props.children.map((child, i) =>
            <div key={ i }
                 style={ Object.assign({}, style.menu.item.base, i > 0 ? style.menu.item.secondary : {}, child.props.styles) }
                 onMouseEnter={ this.onEnterMenuItem }
                 onMouseLeave={ this.onLeaveMenuItem }
                 onClick={ child.props.onClick }>
              { child.props.text }
            </div>
          )}
        </div>
      </div>
    )
  }

}
