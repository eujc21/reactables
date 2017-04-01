import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export default class NavLink extends React.Component {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    style: PropTypes.object,
    hoverColor: PropTypes.string,
    backgroundColor: PropTypes.string
  }

  static defaultProps = {
    style: {},
    hoverColor: '#ffffff',
    backgroundColor: 'transparent'
  }

  state = { isHovered: false }

  handleHover =(e)=>{
    this.setState({
      isHovered: !this.state.isHovered
    })
  }

  setBorderRadius =()=>{
    const { position } = this.props
    if(position === 'first')
      return '5px 5px 0 0'

    if(position === 'middle')
      return 0

    if(position === 'last')
      return '0 0 5px 5px'
  }

  render(){
    const { to, children, style, hoverColor, backgroundColor } = this.props

    const styles = {
      base: {
        position: 'relative',
        backgroundColor: this.state.isHovered ? hoverColor : backgroundColor,
        borderBottom: '1px solid #dcdcdc',
        padding: 0,
        fontSize: 14,
        borderRadius: this.setBorderRadius()
      },
      link:{
        display: 'block',
        margin: 0,
        padding: '5px 3px',
        height: '100%',
        textDecoration: 'none',
        color: 'black'
      }
    }

    merge(styles, style)

    return(
      <li
        style={ styles.base }
        onMouseEnter={ this.handleHover }
        onMouseLeave={ this.handleHover }
      >
        { typeof to === 'string'
          ? <a style={ styles.link } href={ to }>{ children }</a>
          : <a style={ styles.link } href='' onClick={ to }>{ children }</a>
        }
      </li>
    )
  }
}