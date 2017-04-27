import React from 'react'
import PropTypes from 'prop-types'
import { findAdditions } from '../utils/array'

const Permission = {
  GRANTED: 'granted',
  DENIED: 'denied',
  DEFAULT: 'default'
}

export default class NotificationCenter extends React.Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      icon: PropTypes.string,
      image: PropTypes.string,
      badge: PropTypes.string,
      dir: PropTypes.string,
      lang: PropTypes.string,
      tag: PropTypes.string,
      timeout: PropTypes.number,
      data: PropTypes.node,
      vibrate: PropTypes.node,
      renotify: PropTypes.bool,
      requireInteraction: PropTypes.bool
    })),
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    onError: PropTypes.func
  }

  static defaultProps = {

  }

  state = {queue: []}

  componentDidMount(){
    this.requestPermission()
  }

  componentDidUpdate(prevProps){
    const notifications = findAdditions(prevProps.notifications, this.props.notifications)
    notifications.forEach(this.notify)
  }

  requestPermission(){
    const { notifications } = this.props

    if(!window.Notification) return
    if(Notification.permission === Permission.GRANTED) return
    if(Notification.permission === Permission.DENIED) return

    Notification
      .requestPermission()
      .then(permission => {
        if (permission === "granted") {
          //this.notify()
        }
    })

  }

  notify =(notification)=>{
    if(!window.Notification) return
    if(Notification.permission !== Permission.GRANTED) return

    let n = new Notification(notification.title, { ...notification })

    const { onClick, onClose, onError } = this.props

    n.onclick = e => {
      e.preventDefault()
      if(onClick) onClick(e)
    }

    n.onclose = e => {
      if(onClose) onClose(e)
    }

    n.onerror = e => {
      if(onError) onError(e)
    }

    if(notification.timeout)
      setTimeout(n.close.bind(n), notification.timeout)
  }

  render(){
    return null
  }
}