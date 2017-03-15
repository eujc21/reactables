import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/demo_actions'
import Section from '../components/section'
import { withRouter } from 'react-router'

import {
  Navbar,
  Input,
  DateTimePicker,
  Button,
  Table,
  Dropdown,
  DropdownOption,
  ElementLoader,
  HeatBar,
  Select,
  SelectOption,
  ProgressBar,
  Nav,
  NavLink,
  Code,
  HiddenPanel,
  TextSelector,
  TextHighlighter,
  TextMenuOption,
  Pagination
} from '../../../../src/index'

class Components extends React.Component {

  componentDidMount(){
    // this.props.demoCall()
    // setInterval(()=>{
    //   this.props.demoCall()
    //   this.props.incrementCompleted(10)
    // }, 5000)
  }

  handleButtonClick =()=>{

  }

  handleInputChange =(text)=>{
    this.props.updateInputText(text)
  }

  handleInputSubmit =(text)=>{

  }

  handleSelect =(value)=>{
    console.log(value)
  }

  handleDropdownClick =()=>{
    console.log('dropdown click')
  }

  handleDateChange =(date1, date2)=>{
    console.log(date1, date2)
  }

  handlePanelVisibility =(shouldShow)=>{
    this.props.togglePanel(shouldShow)
  }

  handleTextSelectorOption =(text)=>{
    console.log(text)
  }

  handleTextSelection =(text)=>{
    console.log(text)
  }

  handlePaginationClick =(page)=>{
    this.props.updatePaginationPage(page)
  }

  render(){

    const { paginationPage, paginationCount, inputText, isMobile } = this.props

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
        icon: { fontSize: 6, paddingLeft: 4 }
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
      }
    }

    return(
      <div style={ styles.base }>

        <HiddenPanel
          position={ 'left' }
          isVisible={ this.props.isPanelVisible }
          onClickOutside={ ()=> this.handlePanelVisibility(false) }
          width={414}
          style={{ panel: {height: '100vh'}}}
        >
          <div style={ styles.hiddenPanel }>
            <h4 style={{ marginTop: 0 }}>Hidden Panel</h4>
          </div>
        </HiddenPanel>

        <div style={ styles.container }>

          {!isMobile ?
            <div style={ styles.navContainer }>
              <Nav offsetTop={ 70 } style={ styles.nav }>
                <NavLink to="#button" style={ styles.navlink }>Button</NavLink>
                <NavLink to="#input" style={ styles.navlink }>Input</NavLink>
                <NavLink to="#select" style={ styles.navlink }>Select</NavLink>
                <NavLink to="#dropdown" style={ styles.navlink }>Dropdown</NavLink>
                <NavLink to="#date-time-picker" style={ styles.navlink }>Date Picker</NavLink>
                <NavLink to="#table" style={ styles.navlink }>Table</NavLink>
                <NavLink to="#nav" style={ styles.navlink }>Nav</NavLink>
                <NavLink to="#navbar" style={ styles.navlink }>Navbar</NavLink>
                <NavLink to="#heat-bar" style={ styles.navlink }>HeatBar</NavLink>
                <NavLink to="#progress-bar" style={ styles.navlink }>ProgressBar</NavLink>
                <NavLink to="#pagination" style={ styles.navlink }>Pagination</NavLink>
                <NavLink to="#element-loader" style={ styles.navlink }>ElementLoader</NavLink>
                <NavLink to="#hidden-panel" style={ styles.navlink }>HiddenPanel</NavLink>
                <NavLink to="#code" style={ styles.navlink }>Code</NavLink>
                <NavLink to="#text_selector" style={ styles.navlink }>Text Selector</NavLink>
                <NavLink to="#text_highlighter" style={ styles.navlink }>Text Highlighter</NavLink>
                <NavLink to="#text_menu_option" style={ styles.navlink }>Text Menu Option</NavLink>
              </Nav>
            </div> : null
          }

          <div style={ styles.contentContainer }>

            <Section id="button" name="Button">
              <div style={ styles.componentContainer }>
              { [0,1,2,3,4].map(num =>
                <Button
                  key={ num }
                  onClick={ this.handleButtonClick }
                  style={{
                    backgroundColor: `#${3 + (num * 2) + 'A424A'}`,
                    color: '#ffffff',
                    marginRight: 10,
                    height: 25
                  }}
                />
              )}
              </div>
              <Code type="jsx">
                <Button
                  text="button"
                  isHoverable={ true }
                  isDisabled={ false }
                  onClick={ this.handleButtonClick }
                  style={{base: {}}}
                />
              </Code>
            </Section>

            <Section id="input" name="Input">
              <Input
                text={ inputText }
                onChange={ this.handleInputChange }
                onSubmit={ this.handleInputSubmit }
                style={{ base: { width:'100%'}}}
              />
              <Code type="jsx">
                <Input
                  placeholder={ 'Search...' }
                  text={ 'String' }
                  onChange={ this.handleInputChange }
                  onSubmit={ this.handleInputSubmit }
                  style={{
                    base: {},
                    input: {},
                    submitIcon: {},
                    clearIcon: {}
                  }}/>
              </Code>
            </Section>

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

            <Section id="dropdown" name="Dropdown">
              <div style={ styles.componentContainer }>
                <Dropdown node={
                  <span style={ styles.dropdown.base }>
                    <p style={ styles.dropdown.text }>Dropdown</p>
                    <i style={ styles.dropdown.icon} className="icon-arrow-down"/>
                  </span>
                }>

                  <DropdownOption text="Option 1" onClick={ this.handleDropdownClick }/>
                  <DropdownOption text="Option 2" onClick={ this.handleDropdownClick }/>
                  <DropdownOption text="Option 3" onClick={ this.handleDropdownClick }/>
                </Dropdown>
              </div>
              <Code type={ 'jsx' }>
                <Dropdown node="Node">
                </Dropdown>
              </Code>
            </Section>

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


            <Section id="table" name="Table">
              <div style={ styles.tableContainer }>
                <Table isHoverable isStriped tableData={ this.props.tableData }/>
              </div>

              <Code type={ 'jsx' }>
                <Table tableData={ this.props.tableData }/>
              </Code>
            </Section>

            <Section id="nav" name="Nav">
              <Code type={ 'jsx' }>
                <Nav>
                  <NavLink to="/url">Link</NavLink>
                </Nav>
              </Code>
            </Section>

            <Section id="navbar" name="Navbar">
              <Code type={ 'jsx' }>
                <Navbar />
              </Code>
            </Section>

            <Section id="heat-bar" name="HeatBar">
              <HeatBar score={ 10 } outOf={ 100 }/>
              <Code type={'jsx'}>
                <HeatBar score={ 10 } outOf={ 100 }/>
              </Code>
            </Section>

            <Section id="progress-bar" name="ProgressBar">
              <ProgressBar showUnits={ true } completed={ this.props.completed } outOf={ this.props.outOf}/>
              <Code type={ 'jsx' }>
                <ProgressBar completed={ 4 } outOf={ 100 } showUnits={ true } units={ 'percent' } style={{ base: {}, units:{}, bar:{}, completed:{}}}/>
              </Code>
            </Section>

            <Section id="pagination" name="Pagination">

              <Pagination
                page={ paginationPage }
                pageCount={ paginationCount }
                pageSkip={ 3 }
                showFirst
                showLast
                showEllipses
                maintainSkipWidth
                onClick={ this.handlePaginationClick }
              />

              <Code type={ 'jsx' }>
                <Pagination
                  page={ paginationPage }
                  pageCount={ paginationCount }
                  pageSkip={ 3 }
                  showFirst
                  showLast
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

            <Section id="element-loader" name="ElementLoader">

              <div style={ styles.componentContainer }>
                <ElementLoader action={ 'DEMO_CALL' }>
                  <div style={{ border: '1px solid black', width: 100, backgroundColor: 'grey', textAlign: 'center', padding: '20px 0'}}>
                    <p>Wrapped Content</p>
                  </div>
                </ElementLoader>
              </div>

              <Code type="jsx">
                <ElementLoader spinner={ '<span className="optional-custom-spinner" />' } action="DEMO_CALL">
                  <div>
                    Wrapped Content
                  </div>
                </ElementLoader>
              </Code>
            </Section>

            <Section id="hidden-panel" name="HiddenPanel">
              <div style={ styles.componentContainer }>
                <Button
                  text={ 'Show Panel' }
                  onClick={ ()=> this.handlePanelVisibility(true) }
                  style={{
                    backgroundColor: 'rgb(58, 66, 74)',
                    color: 'white',
                    height: 25
                  }}/>
              </div>

              <Code type={ 'JSX' }>
                <HiddenPanel />
              </Code>
            </Section>

            <Section id="code" name="Code">
              <Code type="jsx">
                <Code type="jsx"><p>Display properly formatted code</p></Code>
              </Code>
            </Section>


            <Section id="text_selector" name="Text Selector">
              <TextSelector
                onSelect={ this.handleTextSelection }
                textMenuOptions={[
                  <TextMenuOption
                    onClick={ this.handleTextSelectorOption }>Option 1</TextMenuOption>,
                  <TextMenuOption
                    onClick={ this.handleTextSelectorOption }>Option 2</TextMenuOption>,
                  <TextMenuOption
                    onClick={ this.handleTextSelectorOption }>Option 3</TextMenuOption>
                ]}>
                Lorem ipsum dolor sit amet, arcu lobortis massa adipiscing tortor dui, porta dolor enim, dui pulvinar amet mauris enim vitae et, pede sagittis ac felis erat urna libero. Integer tortor in risus taciti vestibulum, in dui. Purus quisque neque massa enim enim urna, dolore bibendum, ac eget quisque, a sit. Velit mauris venenatis ornare a turpis, sed id, nulla vitae, sed eleifend commodo, feugiat voluptate tempor. Pretium non metus maecenas, aliquet magna vivamus, vivamus mauris dapibus proin ipsum, leo laoreet morbi vestibulum at ac eget, maecenas pede nec vitae lacinia purus. A praesent sit eros fermentum bibendum ullamcorper, sapien facilisis velit donec velit sapien hendrerit. Praesent quia lorem tempus et congue consequat.
              </TextSelector>

              <Code>
                <TextSelector textMenuOptions={['<TextMenuOption>Option</TextMenuOption>']}/>
              </Code>
            </Section>

            <Section id={ 'text_highlighter' } name="Text Highlighter">
              <TextHighlighter
                delimiter={ '#!#' }
                dataId={ true }
                text="Lorem ipsum dolor sit amet, arcu #!#123#!#lobortis#!# massa adipiscing tortor dui, #!#567#!#porta#!# dolor enim, dui pulvinar amet mauris enim vitae et, pede sagittis ac felis erat urna libero. Integer tortor in risus taciti vestibulum, in dui. Purus quisque neque massa enim enim urna, dolore bibendum, ac eget quisque, a sit. Velit mauris venenatis ornare a turpis, sed id, nulla vitae, sed eleifend commodo, feugiat voluptate tempor. Pretium non metus maecenas, aliquet magna vivamus, vivamus mauris dapibus proin ipsum, leo laoreet morbi vestibulum at ac eget, maecenas pede nec vitae lacinia purus. A praesent sit eros fermentum bibendum ullamcorper, sapien facilisis velit donec velit sapien hendrerit. Praesent quia lorem tempus et congue consequat."
                textMenuOptions={[
                  <TextMenuOption
                    onClick={ this.handleTextSelectorOption }>Option 1</TextMenuOption>,
                ]}
              />
              <Code>
                <TextHighlighter textMenuOptions={['<TextMenuOption>Option</TextMenuOption>']}/>
              </Code>
            </Section>

            <Section id={ 'text_menu_option' } name="Text Menu Option">
              <div style={{ backgroundColor: 'black', color: 'white', borderRadius: 3, fontSize: 12}}>
                <TextMenuOption onClick={()=>{}}>Option</TextMenuOption>
              </div>
              <Code>
                <TextMenuOption onClick={()=>{}}>Option</TextMenuOption>
              </Code>
            </Section>

          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    paginationPage: state.components.paginationPage,
    paginationCount: state.components.paginationCount,
    isMobile: state.app.isMobile,
    inputText: state.components.inputText,
    outOf: state.components.outOf,
    completed: state.components.completed,
    tableData: state.components.tableData,
    isPanelVisible: state.components.isPanelVisible
  }
}

export default connect(mapStateToProps, {
  updatePaginationPage: actions.updatePaginationPage,
  updateInputText: actions.updateInputText,
  demoCall: actions.demoCall,
  incrementCompleted: actions.incrementCompleted,
  togglePanel: actions.togglePanel
})(Components)