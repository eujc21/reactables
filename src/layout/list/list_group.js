import React, { PropTypes } from 'react'
import { HiddenPanel } from '../../index'
import TransitionGroup from 'react-addons-transition-group'
import merge from 'lodash/merge'


export default class ListGroup extends React.Component {

  static propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    shouldShow: PropTypes.bool,
    isResponsive: PropTypes.bool,
    onClickOutside: PropTypes.func,
    listAnimationTime: PropTypes.number,
    style: PropTypes.object
  }

  static defaultProps = {
    shouldShow: false,
    isResponsive: false,
    listAnimationTime: 0.4,
    style: { base: {}, hiddenPanel: {}},
    onClickOutside: ()=>{}
  }

  render(){

    const { isResponsive, shouldShow, selectedIndex, transitionTime, style, children } = this.props

    const styles = {
      base:{
        display: 'flex',
        maxWidth: 414,
        width: '100%',
        overflowX: 'hidden',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
      },
      hiddenPanel: {
        panel: {
          height: '100vh', display: 'flex', flexDirection: 'column'
        }
      }
    }

    merge(styles, style)

    const lists = React.Children.toArray(children).map((list, i) =>{
      return React.cloneElement(list, {
        listIndex: i,
        selectedIndex,
        transitionTime
      })
    })

    // Only render these 3 lists to the DOM. List Component's
    // componentWillReceiveProps will trigger unintended animations otherwise.
    const visibleList = lists[selectedIndex] ? lists[selectedIndex] : null
    const nextList = lists[selectedIndex + 1] ? lists[selectedIndex + 1] : null

    let ListGroup = (
      <TransitionGroup style={ styles.base }>
        { [visibleList, nextList] }
      </TransitionGroup>
    )

    if(isResponsive)
      ListGroup = (
        <HiddenPanel
          isVisible={ shouldShow }
          position={ 'left' }
          width={ 414 }
          onClickOutside={ this.props.onClickOutside }
          style={ styles.hiddenPanel }>
          { ListGroup }
        </HiddenPanel>
      )

    return ListGroup
  }
}