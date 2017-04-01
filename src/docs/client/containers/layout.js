import React from 'react'
import { Nav, NavLink, Code, List, ListGroup, ListMenu, ListToolbar, ListCell, Grid, GridItem, withMediaQueries, Button } from '../../../lib/index'
import { connect } from 'react-redux'
import { incrementList } from '../actions/layout_actions'
import Section from '../components/section'

class Layout extends React.Component {

  state = { isListMenuVisible: false }

  handleIncrementList =(increment)=>{
    const index = this.props.listIndex + increment
    this.props.incrementList(index)
  }

  showListMenu =()=>{
    this.setState({ isListMenuVisible: true })
  }

  hideListMenu =()=>{
    this.setState({ isListMenuVisible: false })
  }
  render(){

    const { mediaQuery, breakPoints, orientation } = this.props

    const styles = {
      base: {
        position: 'relative',
      },
      container: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      },
      navContainer: {
        position: 'relative',
        order: 1,
        padding: '60px 60px 0 0'
      },
      contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        maxWidth: 600,
        padding: '0 10px',
        order: 2,
      },
      componentContainer: {
        width: '100%'
      },
      nav: {
        base: {width: 150},
        nav: {borderTop: null, borderLeft: null, borderRadius: 0}
      },
      navlink: {
        base: {border: 0, borderRadius: 0},
        link: {padding: '5px 3px'}
      },
      gridItem: {
        base:{
          width: 60,
          height: 60
        }
      },
      listCell: {
        base:{
          height: 50,
          display: 'flex',
          alignItems: 'center',
          padding: 10
        }
      }
    }

    return(
      <div style={ styles.container }>

        { true ?
          <div style={ styles.navContainer }>
            <Nav offsetTop={ 70 } style={ styles.nav }>
              <NavLink to="#media-queries" style={ styles.navlink }>Media Queries</NavLink>
              <NavLink to="#list" style={ styles.navlink }>List</NavLink>
              <NavLink to="#grid" style={ styles.navlink }>Grid</NavLink>
            </Nav>
          </div> : null
        }

        <div style={ styles.contentContainer }>

          <Section id="media-queries" name="Media Queries">
            <Code type="Live">
              {currentPageMediaQuery(breakPoints, mediaQuery, orientation)}
            </Code>

            <Code type="jsx">
              { mediaQueryExample }
            </Code>
          </Section>

          <Section id="list" name="List">

            <ListGroup selectedIndex={ this.props.listIndex } transitionTime={ 0.3 }>
              <List>

                <ListToolbar type="fixed">
                  <p style={{padding: 0, margin: 0}}> List 0 </p>
                </ListToolbar>

                { [0,1,2,3].map(item =>
                  <ListCell key={ item } style={ styles.listCell } onClick={ ()=> this.handleIncrementList(1)}>
                    Item { item }
                  </ListCell>
                )}

              </List>
              <List>
                {/* List Toolbar*/}
                <ListToolbar type="fixed" style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <i className="material-icons" style={{cursor: 'pointer'}} onClick={ ()=>this.handleIncrementList(-1) }>keyboard_arrow_left</i>
                  <p style={{padding: 0, margin: 0}}>
                     List 1
                  </p>
                  <Button text={'Menu'} onClick={ this.showListMenu }/>
                </ListToolbar>

                {/* List Cells */}
                { [0,1,2,3].map(item =>
                  <ListCell key={ item } style={ styles.listCell } onClick={()=>{}}>
                    Item { item }
                  </ListCell>
                )}

                {/* Hidden List Menu */}
                <ListMenu>
                  <ListToolbar style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <p style={{padding: 0, margin: 0}}>
                      Menu
                    </p>
                    <Button text={'Apply'} onClick={ this.hideListMenu }/>
                  </ListToolbar>
                  <div> List Menu Content </div>
                </ListMenu>

              </List>
            </ListGroup>

            <Code type="jsx">
              { listExample(this.props.listIndex) }
            </Code>
          </Section>

          <Section id="grid" name="Grid">

            <Grid>
              { [0,1,2,3,4,5,6,7,8].map(item =>
                <GridItem key={ item } style={ styles.gridItem }/>
              )}
            </Grid>

            <Code type="jsx">
              <Grid>
                <GridItem key={ 'key' } style={{base:{}, hovered:{}}}/>
              </Grid>
            </Code>

          </Section>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    listIndex: state.layout.listIndex
  }
}

export default connect(mapStateToProps, {
  incrementList
})(withMediaQueries(Layout))