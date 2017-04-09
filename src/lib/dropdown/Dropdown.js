import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export default class Dropdown extends React.Component {

  static propTypes = {
    node: PropTypes.node.isRequired,
    isDisabled: PropTypes.bool,
    menuDirection: PropTypes.string,
    children: PropTypes.arrayOf((propValue, key,) => {
      if (propValue[key].type.name !== 'DropdownOption')
        return new Error('One or more children are not of type DropdownOption')
    }),
    style: PropTypes.object
  }


  static defaultProps = {
    animate: false,
    menuDirection: 'right',
    isDisabled: false,
    style: {}
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

    const { isDisabled, children, style } = this.props

    let styles = {
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

    merge(styles, style)

    return(
      <span ref={ main => this.main = main } style={ styles.base }>
        <div
          style={ styles.node }
          onMouseOver={ this.toggleButtonHighlight }
          onMouseLeave={ this.toggleButtonHighlight }
          onClick={ this.toggleMenu }>

          <div style={ styles.node }>
            { this.props.node }
          </div>

        </div>
        <div style={ styles.menu } onClick={ this.handleMenuClick }>
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
