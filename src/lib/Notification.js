import React from 'react'
import PropTypes from 'prop-types'

export default class Notify extends React.Component {

  static propTypes = {
    notificationType: PropTypes.oneOf(['desktop', 'browser']).isRequired,
    fallback: PropTypes.bool, // if desktop
    batchTime: PropTypes.number,
    timeout: PropTypes.number,
    message: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string
  }

  static defaultProps = {
    batchTime: 0
  }
  componentDidMount(){


    if(!window.Notification)
      return

    if (Notification.permission === "granted") {
      var notification = this.spawnNotification('This is a notification', null, 'The new title')
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          var notification = this.spawnNotification('This is a notification', null, 'The new title')
        }
      })
    }
  }


  spawnNotification =(title, message, icon) =>{
    const options = {
      body: message,
      icon: icon
    }
    let n = new Notification(title, options);
    setTimeout(n.close.bind(n), 5000);
  }

  render(){
    return null
  }
}