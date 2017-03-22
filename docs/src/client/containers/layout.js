import React from 'react'
import { Nav, NavLink, Code, List, ListGroup, ListMenu, ListToolbar, ListCell, Grid, GridItem, withMediaQueries, Button } from '../../../../src/index'
import { connect } from 'react-redux'
import { incrementList } from '../actions/layout_actions'
import Section from '../components/section'

const listExample =(index)=>
`<ListGroup selectedIndex={ ${index} } transitionTime={ 0.3 }>
  <List key="0">
    <ListToolbar type="fixed">
      <p>List 1</p>
    </ListToolbar>
    <ListCell style={{}}>
      Content
    </ListCell>
  </List>
  <List key="1">
    <ListToolbar type="fixed">
      <p>List 2</p>
    </ListToolbar>
    <ListCell style={{}}>
      Content
    </ListCell>
  </List>
</ListGroup>`

const currentPageMediaQuery=(breakPoints, mediaQuery, orientation)=>
`Break Points
xs:  ${breakPoints.xs}
sm:  ${breakPoints.sm}
md:  ${breakPoints.md}
lg:  ${breakPoints.lg}
xl:  ${breakPoints.xl}
xxl: ${breakPoints.xxl}

Size Name:   ${mediaQuery.sizeName}
Size Value:  ${mediaQuery.sizeValue }
Min Width:   ${mediaQuery.minWidth}
Max Width:   ${mediaQuery.maxWidth}
Orientation: ${ orientation }
`

const mediaQueryExample =
`import { withMediaQueries } from 'reactables'

class MyComponent extends React.Component { 

  render(){
  
    const { 
      mediaQuery,  // {sizeName,sizeValue,minWidth,maxWidth}
      breakPoints, // {xs, sm, md, lg, xl, xxl}
      orientation  // 'landscape' or 'portrait' 
    } = this.props
    
    return(...)
  }
}

// The optionalBreakPoints below are the defaults
// You are not required to set these

const optionalBreakPoints = {
    // xxl - greater than 1440 (Infinity)
    xl: 1440, // extra large  - between 1440 & 1030
    lg: 1030, // large - between 1030 & 991
    md: 991,  // medium - between 991 & 767
    sm: 768,  // small - between 767 & 414
    xs: 414,  // extra small - below 414
}

export default withMediaQueries(MyComponent, optionalBreakPoints)
`

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