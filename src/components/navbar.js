import React, { PropTypes } from 'react'

// ** usage ( using react-router Link )**
//
// <Navbar
//   brand={ <Link to={ '/' }> BRAND </Link> }
//   color={ '#ffffff' }
//   backgroundColor={ '#000000' }>
//   {[
//     { link: <Link to={ '/link1' }>Link 1</Link> },
//     { link: <Link to={ '/link2' }>Link 2</Link> }
//   ]}
// </Navbar>

class Navbar extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string
  }

  static defaultProps = {
    height: 70,
    color: '#ffffff',
    backgroundColor: '#333333'
  }

  render(){

    const { brand, height, backgroundColor, color, children } = this.props

    let style = {
      base:{
        display: 'flex',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        width: '100%',
        height,
        backgroundColor,
        textDecoration: 'none'
      },
      brand:{
        display: 'flex',
        alignItems: 'center',
        height,
        color,
        padding: '0 15px'
      },
      bar:{
        base:{
          display: 'flex',
          alignItems: 'center'
        },
        link:{
          display: 'flex',
          alignItems: 'center',
          height,
          color: '#ffffff',
          padding: '0 15px',
          textDecoration: 'none'
        }
      }
    }
    return(
      <div style={ style.base }>
        <div style={ style.brand }>
          { brand }
        </div>
        <div style={ style.bar.base }>
          { children.map((child, i) =>
            <div key={ i } style={ style.bar.link }>{ child.link }</div>
          )}
        </div>
      </div>
    )
  }
}

export default Navbar
