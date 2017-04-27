import React from 'react'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Code from '../components/Code'

import {
  NotificationCenter,
  Navbar,
  NavbarLink,
  Checkbox,
  SearchBar,
  DateTimePicker,
  Button,
  ButtonGroup,
  Badge,
  Table,
  Dropdown,
  DropdownMenu,
  DropdownNode,
  DropdownOption,
  Select,
  SelectOption,
  ProgressBar,
  Nav,
  NavLink,
  HiddenPanel,
  List,
  ListCell,
  ListToolbar,
  ListMenu,
  ListGroup,
  Pagination,
  Grid,
  GridItem,
  withMediaQueries
} from '../../../lib/index'

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

const DropdownExample =
`<Dropdown>
  <DropdownNode>Text</DropdownNode>
  <DropdownMenu>
    <DropdownOption 
      text="Option 1" 
      value="value1"
      onClick={this.onClick}/>
  </DropdownMenu>
</Dropdown>`

class App extends React.Component {

  state = {
    activeButton: 3,
    listIndex: 1,
    page: 4,
    isListMenuVisible: false,
    dropdown: false,
    isHiddenPanelVisible: false,
    searchText: '',
    notifications: []
  }

  handleIncrementList =(increment)=> this.setState({listIndex: this.state.listIndex + increment})

  showListMenu =()=> this.setState({ isListMenuVisible: true })

  hideListMenu =()=> this.setState({ isListMenuVisible: false })

  handleSearchChange =(searchText)=> this.setState({searchText})

  handleSearchSubmit =(text)=> console.log(text)

  handleSelect =(value)=>console.log(value)

  handleDropdownClick =()=> console.log('dropdown click')

  handleDateChange =(date1, date2)=> console.log(date1, date2)

  handlePanelVisibility =(isHiddenPanelVisible)=> this.setState({isHiddenPanelVisible})

  handleButtonGroup = (value, i)=> this.setState({activeButton: value })

  handleButtonClick = (value) => console.log(value)

  handlePaginationClick =(page)=> this.setState({page})

  handleNotificationAdd =()=> {
    this.setState({
      notifications: [
        ...this.state.notifications,
        {
          title: 'Notification',
          body: 'This is a notification',
          icon: 'https://github.com/google/material-design-icons/raw/a6145e167b4a3a65640dd6279319cbc77a7e4e96/communication/drawable-hdpi/ic_email_black_36dp.png',
          timeout: 0
        }
      ]
    })
  }

  handleNotificationClick =(e)=>{
    console.log(e)
    // const notifications = [...this.state.notifications]
    // this.setState({notifications})
  }

  handleNotificationClose =(e)=>{
    console.log(e)
  }



  render(){

    const { isMobile, mediaQuery, breakPoints, orientation  } = this.props

    const styles = {
      base: {
        position: 'relative',
      },
      navbar: {
        base:{
          position: 'fixed',
        },
        bar: {
          backgroundColor: '#32b1d1',
          color: 'white',
          transition: 'background-color 10ms ease-in-out',
          height: 60
        },
        title: {
          link:{
            base:{
              fontWeight: 600
            },
            hover: {
              backgroundColor: '#38d2e0'
            },
            active:{
              backgroundColor: '#38d2e0'
            }
          }
        }
      },
      navbarLink: {
        link: {
          hover: {
            backgroundColor: '#38d2e0'
          },
          active:{
            backgroundColor: '#38d2e0'
          }
        },
        menuLink: {
          active: {
            backgroundColor: null
          }
        }
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
      componentContainer:{
        width: '100%'
      },
      nav: {
        base: { width: 150 },
        nav:{ borderTop: null, borderLeft: null, borderRadius: 0 }
      },
      navlink: {
        base: { border: 0, borderRadius: 0 },
        link:{ padding: '5px 3px' }
      },
      tableContainer: {
        backgroundColor: 'white',
        border: '1px solid #EBE9ED',
        borderRadius: 2
      },
      hiddenPanel: {
        height: 'inherit',
        width: 'inherit',
        backgroundColor: '#ffffff',
        textAlign: 'center',
      },
      dropdown: {
        base:{
          display: 'flex',
          alignItems: 'center',
          padding: 5,
          borderRadius: 3,
          backgroundColor: 'rgb(154, 66, 74)',
          color: 'white',
          boxShadow: null
        },
        text: { fontSize: 14, margin: 0, padding: 0 },
        icon: { fontSize: 14, paddingLeft: 4 }
      },
      datePicker: {
        base: {
          width: '100%'
        },
        input: {
          base: {
            height: 26,
            fontSize: 14
          }
        }
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

      <div>
        <Navbar responsiveWidth={ 767 } style={ styles.navbar }>
          <NavbarLink to={'/'} style={ styles.navlink }>
            Reactables
          </NavbarLink>
          <NavbarLink to={'/'} isActive style={ styles.navbarLink }>
            Core
          </NavbarLink>
        </Navbar>

        <Hero
          title="Reactables"
          tagline="Customizable React.js Components" />

        <div id="container" ref={ container => this.container = container } style={ styles.base }>

          <HiddenPanel
            position={ 'right' }
            isVisible={ this.state.isHiddenPanelVisible }
            onClickOutside={ ()=> this.handlePanelVisibility(false) }
            width={414}
            style={{ panel: {height: '100vh'}}}
          >
            <div style={ styles.hiddenPanel }>
              <h4 style={{ marginTop: 0 }}>Hidden Panel</h4>
            </div>
          </HiddenPanel>

          <div style={ styles.container }>

            { !isMobile ?
              <div style={ styles.navContainer }>
                <Nav offsetTop={ 70 } style={ styles.nav }>
                  <NavLink to="#badge" style={ styles.navlink }>Badge</NavLink>
                  <NavLink to="#button" style={ styles.navlink }>Button</NavLink>
                  <NavLink to="#button-group" style={ styles.navlink }>ButtonGroup</NavLink>
                  <NavLink to="#checkbox" style={ styles.navlink }>Checkbox</NavLink>
                  <NavLink to="#date-time-picker" style={ styles.navlink }>Date Picker</NavLink>
                  <NavLink to="#dropdown" style={ styles.navlink }>Dropdown</NavLink>
                  <NavLink to="#grid" style={ styles.navlink }>Grid</NavLink>
                  <NavLink to="#hidden-panel" style={ styles.navlink }>HiddenPanel</NavLink>
                  <NavLink to="#list" style={ styles.navlink }>List</NavLink>
                  <NavLink to="#media-queries" style={ styles.navlink }>Media Queries</NavLink>
                  <NavLink to="#notification-center" style={ styles.navlink }>NotificationCenter</NavLink>
                  <NavLink to="#pagination" style={ styles.navlink }>Pagination</NavLink>
                  <NavLink to="#progress-bar" style={ styles.navlink }>ProgressBar</NavLink>
                  <NavLink to="#nav" style={ styles.navlink }>Nav</NavLink>
                  <NavLink to="#navbar" style={ styles.navlink }>Navbar</NavLink>
                  <NavLink to="#search-bar" style={ styles.navlink }>SearchBar</NavLink>
                  <NavLink to="#select" style={ styles.navlink }>Select</NavLink>
                  <NavLink to="#table" style={ styles.navlink }>Table</NavLink>
                </Nav>
              </div> : null }

            <div style={ styles.contentContainer }>

              {/**
               * Badge
               */}

              <Section id="badge" name="Badge">
                <div style={ styles.componentContainer }>
                  { [0,1,2,3,4].map(num =>
                    <Badge key={ num } text="Badge" canClear/>
                  )}
                </div>
                <Code type="jsx">
                  <Badge canClear text="Badge"/>
                </Code>
              </Section>

              {/**
               * Button
               */}

              <Section id="button" name="Button">
                <div style={ styles.componentContainer }>
                { [0,1,2,3,4].map(num =>
                  <Button
                    key={ num }
                    onClick={ this.handleButtonClick }
                    style={{
                      base:{
                        backgroundColor: `#${3 + (num * 2) + 'A424A'}`,
                        color: '#ffffff',
                        marginRight: 10,
                        height: 25
                      }
                    }}
                  />
                )}
                </div>
                <Code type="jsx">
                  <Button
                    text="button"
                    onClick={ this.handleButtonClick }
                    style={{base: {}}}
                  />
                </Code>
              </Section>

              {/**
               * Button Group
               */}

              <Section id="button-group" name="Button Group">
                <div style={ styles.componentContainer }>

                  <ButtonGroup activeValue={ this.state.activeButton  } onChange={ this.handleButtonGroup }>
                    <Button text='one'   value={ 1 }/>
                    <Button text='two'   value={ 2 }/>
                    <Button text='three' value={ 3 }/>
                    <Button text='four'  value={ 4 }/>
                  </ButtonGroup>

                </div>
                <Code type="jsx">
                  <ButtonGroup activeValue={ this.state.activeButton }>
                  </ButtonGroup>
                </Code>
              </Section>

              {/**
               * Checkbox
               */}

              <Section id="checkbox" name="Checkbox">
                <div style={ styles.componentContainer }>
                  { [1,2,3,4,5,6,7].map(num =>
                    <Checkbox
                      key={ num }
                      id={ num }
                      tabIndex={ num }
                      value={ num }
                      onClick={(isChecked, value, e)=>console.log(isChecked, value, e)}
                    />
                  )}
                </div>
                <Code type="jsx">
                  <Checkbox id="for-label-x"/>
                </Code>
              </Section>

              {/**
               * DateTimePicker
               */}

              <Section id="date-time-picker" name="DateTimePicker">

                <DateTimePicker
                  canClear
                  placeholder={ 'Date Time' }
                  onChange={ this.handleDateChange }
                  style={ styles.datePicker }
                />

                <Code type={ 'jsx' }>
                  <DateTimePicker/>
                </Code>
              </Section>

              {/**
               * Dropdown
               */}

              <Section id="dropdown" name="Dropdown">
                <div style={ styles.componentContainer }>
                  <Dropdown
                    isActive={ this.state.dropdown }
                    onClick={ ()=> this.setState({dropdown: !this.state.dropdown})}
                    onClickOutside={ ()=> this.setState({dropdown: false})}
                  >
                    <DropdownNode style={{ base: { color: 'white', backgroundColor: 'grey', fontSize: 14}}}>
                      Dropdown <i className="material-icons" style={{ fontSize: 16}}>keyboard_arrow_down</i>
                    </DropdownNode>
                    <DropdownMenu>
                      <DropdownOption text="Option 1" onClick={ this.handleDropdownClick }/>
                      <DropdownOption text="Option 2" onClick={ this.handleDropdownClick }/>
                      <DropdownOption text="Option 3" onClick={ this.handleDropdownClick }/>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <Code type={ 'jsx' }>
                  { DropdownExample }
                </Code>
              </Section>

              {/**
               * Grid
               */}

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

              {/**
               * Hidden Panel
               */}

              <Section id="hidden-panel" name="HiddenPanel">
                <div style={ styles.componentContainer }>
                  <Button
                    text={ 'Show Panel' }
                    onClick={ ()=> this.handlePanelVisibility(true) }
                    style={{
                      base:{
                        backgroundColor: 'grey',
                        color: 'white',
                        padding: 10
                      }
                    }}/>
                </div>

                <Code type={ 'JSX' }>
                  <HiddenPanel />
                </Code>
              </Section>

              {/**
               * List
               */}

              <Section id="list" name="List">
                <ListGroup selectedIndex={ this.state.listIndex } transitionTime={ 0.3 }>
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
                    <ListToolbar type="fixed" style={{ base: {display: 'flex', justifyContent: 'space-between'}}}>
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
                    <ListMenu isVisible={ this.state.isListMenuVisible }>
                      <ListToolbar style={{ base: {display: 'flex', justifyContent: 'space-between'}}}>
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

              {/**
               * Media Queries
               */}

              <Section id="media-queries" name="Media Queries">
                <Code type="Live">
                  {currentPageMediaQuery(breakPoints, mediaQuery, orientation)}
                </Code>
                <Code type="jsx">
                  { mediaQueryExample }
                </Code>
              </Section>

              {/**
               * Nav
               */}

              <Section id="nav" name="Nav">
                <Code type={ 'jsx' }>
                  <Nav>
                    <NavLink to="/url">Link</NavLink>
                  </Nav>
                </Code>
              </Section>

              {/**
               * Navbar
               */}

              <Section id="navbar" name="Navbar">
                <Code type={ 'jsx' }>
                  <Navbar />
                </Code>
              </Section>

              {/**
               * Notification Center
               */}

              <Section id="notification-center" name="NotificationCenter">
                <Button text="Add Notification" onClick={ this.handleNotificationAdd }/>
                <NotificationCenter
                  notifications={ this.state.notifications }
                  onClose={ this.handleNotificationClose }
                  onClick={ this.handleNotificationClick }
                  onError={ this.handleNotificationError }
                />

                <Code type="jsx">
                  <NotificationCenter
                    notifications={[]}
                    onDismiss={ ()=>{} }
                  />
                </Code>
              </Section>

              {/**
               * Pagination
               */}

              <Section id="pagination" name="Pagination">
                <Pagination
                  page={ this.state.page }
                  pageCount={ 10 }
                  pageSkip={ 3 }
                  showEllipses
                  maintainSkipWidth
                  onClick={ this.handlePaginationClick }
                />

                <Code type={ 'jsx' }>
                  <Pagination
                    page={ this.state.page  }
                    pageCount={ 10 }
                    pageSkip={ 3 }
                    showEllipses
                    maintainSkipWidth
                    firstText={'First'}
                    lastText={'Last'}
                    nextText={'Next'}
                    prevText={'Prev'}
                    onClick={()=>{}}
                    styles={{ul:{}, pageControl:{base:{}, disabled:{}}, pageNumber:{}, selected:{}, ellipses:{}}}/>
                </Code>
              </Section>

              {/**
               * ProgressBar
               */}

              <Section id="progress-bar" name="ProgressBar">
                <ProgressBar
                  type="progress"
                  units={'number'}
                  showUnits={ true }
                  completed={ 40 }
                  outOf={ this.props.outOf }
                />
                <Code type={ 'jsx' }>
                  <ProgressBar completed={ 4 } outOf={ 100 } showUnits={ true } units={ 'percent' } style={{ base: {}, units:{}, bar:{}, completed:{}}}/>
                </Code>
              </Section>

              {/**
               * SearchBar
               */}

              <Section id="search-bar" name="SearchBar">
                <SearchBar
                  text={ this.state.searchText }
                  onChange={ this.handleSearchChange }
                  onSubmit={ this.handleSearchSubmit }
                  style={{ base: { width:'100%'}}}
                />
                <Code type="jsx">
                  <SearchBar
                    placeholder={ 'Search...' }
                    text={ 'String' }
                    onChange={ this.handleSearchChange }
                    onSubmit={ this.handleSearchSubmit }
                    style={{
                      base: {},
                      input: {},
                      submitIcon: {},
                      clearIcon: {}
                    }}/>
                </Code>
              </Section>

              {/**
               * Select
               */}

              <Section id="select" name="Select">
                <Select onChange={ this.handleSelect }>
                  <SelectOption text="Option 1" value="option_1"/>
                  <SelectOption text="Option 2" value="option_2"/>
                  <SelectOption text="Option 3" value="option_3"/>
                </Select>
                <Code type="jsx">
                  <Select onChange={ this.handleSelect }>

                  </Select>
                </Code>
              </Section>

              {/**
               * Table
               */}

              <Section id="table" name="Table">
                <div style={ styles.tableContainer }>
                  <Table isHoverable isStriped tableData={ this.props.tableData }/>
                </div>
                <Code type={ 'jsx' }>
                  <Table tableData={ this.props.tableData }/>
                </Code>
              </Section>

            </div>
          </div>

        </div>
      </div>
    )
  }
}


App.defaultProps = {
  paginationPage: 4,
  paginationCount: 10,
  isMobile: false,
  inputText: '',
  outOf: 100,
  completed: 40,
  tableData: [{a: 1, b:2, c:3}, {a: 4, b:5, c: 6}, {a:7,b:8,c:9}],
  isPanelVisible: false,
  listIndex: 1
}


export default withMediaQueries(App)