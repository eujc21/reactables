import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

export class Navbar extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    styles: PropTypes.object
  }

  static defaultProps = {
    title: 'Reactables',
    styles: {}
  }

  constructor(props) {
    super(props)
    //this.innerWidth = 0
  }

  componentDidMount(){
    //this.innerWidth = this.links.getBoundingClientRect().right + 15
  }

  render(){

    const { title, styles, children } = this.props

    let style = {
      base:{
        display: 'flex',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        width: '100%',
        height: 70,
        backgroundColor: '#000000',
        textDecoration: 'none',
      },
      bar:{
        display: 'flex',
        alignItems: 'center'
      },
      title:{
        display: 'flex',
        alignItems: 'center',
        height: 'inherit',
        color: '#ffffff',
        padding: '0 15px'
      },
      link:{
        color: '#ffffff',
        padding: '0 15px',
        textDecoration: 'none'
      }
    }

    merge(style, styles)

    return(
      <div style={ style.base }>
        <div style={ style.title }>
          { title }
        </div>
        <div
          ref={ links => this.links = links }
          style={ style.bar }
        >
          { children ? React.Children.toArray(children).map((child, i) =>
            <div key={ i } style={ style.link }>{ child }</div>
          ) : null }
        </div>
      </div>
    )
  }
}
