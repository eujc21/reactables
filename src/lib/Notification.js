import React from 'react'
import PropTypes from 'prop-types'

const Permission = {
  GRANTED: 'granted',
  DENIED: 'denied',
  DEFAULT: 'default'
}

export default class Notification extends React.Component {
  static propTypes = {
    timeout: PropTypes.number,
    message: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    permissionTitle: PropTypes.string,
    permissionMessage: PropTypes.string,
    permissionIcon: PropTypes.string
  }

  static defaultProps = {
    title: 'Notification',
    message: 'New test message!',
    icon: 'https://github.com/google/material-design-icons/raw/a6145e167b4a3a65640dd6279319cbc77a7e4e96/communication/drawable-hdpi/ic_email_black_36dp.png',
    timeout: 5000
  }

  constructor(props){
    super(props)
    this.notification = window.Notification || null
  }
  componentDidMount(){
    this.requestPermission()
  }

  componentDidUpdate(){

  }

  requestPermission(){
    const { icon, permissionIcon, title, permissionTitle, message, permissionMessage } = this.props

    if(!this.notification) return
    if(this.notification.permission === Permission.GRANTED) return
    if(this.notification.permission === Permission.DENIED) return

    this.notification.requestPermission()
      .then(permission => {
        if (permission === "granted") {
          this.notify(
            permissionTitle || title,
            permissionMessage || message,
            permissionIcon || icon
          )
        }
    })

  }

  notify =(title, body, icon) =>{
    if(!this.notification) return
    if(this.notification.permission !== Permission.GRANTED) return

    const { timeout } = this.props

    let n = new this.notification(title, {
      title,
      body,
      icon
    })

    setTimeout(n.close.bind(n), timeout);
  }

  render(){
    return null
  }
}