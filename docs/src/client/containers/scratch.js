import React from 'react'
import { BaseContainer, Wrapper, Nav, NavLink, Code, List, ListGroup, ListMenu, ListToolbar, ListCell, Grid, GridItem, withMediaQueries, Button } from '../../../../src/index'

class Scratch extends React.Component {

  state = {
    isListMenuVisible: false,
    listIndex: 1,
    isListGroupVisible: true
  }

  handleIncrementList =(increment)=>{
    const index = this.state.listIndex + increment
    this.setState({ listIndex: index })
  }

  showListGroup =()=>{
    this.setState({ isListGroupVisible: true })
  }

  hideListGroup =()=>{
    this.setState({ isListGroupVisible: false })
  }

  showListMenu =()=>{
    this.setState({ isListMenuVisible: true })
  }

  hideListMenu =()=>{
    this.setState({ isListMenuVisible: false })
  }

  render(){

    const { mediaQuery, breakPoints } = this.props

    const isCompact = mediaQuery.maxWidth <= breakPoints.md

    const styles = {
      listGroup: {
        base: {
          backgroundColor: 'white',
        },
      },
      list: {
        base:{

        }
      },
      listToolbar: { display: 'flex', justifyContent: 'space-between'},
      listMenu:{
        base:{

        }
      },
      listCell: {
        base:{
          height: 50,
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          padding: 10
        }
      },
      title: {padding: 0, margin: 0}
    }

    return(
      <BaseContainer
        direction="row"
        type="fixed">

          <ListGroup
            selectedIndex={ this.state.listIndex }
            isResponsive={ isCompact }
            shouldShow={ this.state.isListGroupVisible }
            onClickOutside={ this.hideListGroup }
            style={ styles.listGroup }
          >
            <List style={ styles.list }>
              <ListToolbar type="fixed">
                <p style={ styles.title }> List 0 </p>
              </ListToolbar>

              { [0,1,2,3].map(item =>
                <ListCell key={ item } style={ styles.listCell } onClick={ ()=> this.handleIncrementList(1)}>
                  Item { item }
                </ListCell>
              )}

            </List>
            <List style={ styles.list }>
              {/* List Toolbar*/}
              <ListToolbar type="fixed" style={ styles.listToolbar }>
                <i className="material-icons" style={{cursor: 'pointer'}} onClick={ ()=>this.handleIncrementList(-1) }>keyboard_arrow_left</i>
                <p style={ styles.title }>
                  List 1
                </p>
                <Button text={'Menu'} onClick={ this.showListMenu }/>
              </ListToolbar>

              {/* List Cells */}
              { [0,1,2,3].map(item =>
                <ListCell key={ item } style={ styles.listCell } onClick={ this.hideListGroup }>
                  Item { item }
                </ListCell>
              )}

              {/* Hidden List Menu */}
              <ListMenu isVisible={ this.state.isListMenuVisible }>
                <ListToolbar style={ styles.listToolbar }>
                  <p style={ styles.title }>
                    Menu
                  </p>
                  <Button text={'Apply'} onClick={ this.hideListMenu }/>
                </ListToolbar>
                <p> List Menu Content </p>
                <p> List Menu Content </p>
                <p> List Menu Content </p>
                <p> List Menu Content </p>
                <p> List Menu Content </p>
                <p> List Menu Content </p>
                <p> List Menu Content </p>
                <p> List Menu Content </p>

              </ListMenu>

            </List>
          </ListGroup>

        { isCompact ? <Button onClick={ this.showListGroup } text="Show List Group"/> : null }
      </BaseContainer>
    )
  }
}


export default withMediaQueries(Scratch)